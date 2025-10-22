<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reclamation;
use App\Models\User;
use App\Models\Commande;
use Illuminate\Support\Facades\Auth;

class ReclamationController extends Controller
{
    /**
     * Créer une nouvelle réclamation
     */
    public function store(Request $request)
    {
        $request->validate([
            'commande_id' => 'required|exists:commandes,id',
            'sujet' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
        ]);

        try {
            // Vérifier que la commande appartient à l'utilisateur connecté
            $commande = Commande::where('id', $request->commande_id)
                ->where('user_id', Auth::id())
                ->first();

            if (!$commande) {
                return response()->json([
                    'error' => 'Commande introuvable ou ne vous appartient pas'
                ], 404);
            }

            // Vérifier qu'il n'y a pas déjà une réclamation pour cette commande
            $existingReclamation = Reclamation::where('commande_id', $request->commande_id)
                ->where('user_id', Auth::id())
                ->first();

            if ($existingReclamation) {
                return response()->json([
                    'error' => 'Une réclamation existe déjà pour cette commande'
                ], 400);
            }

            $reclamation = Reclamation::create([
                'user_id' => Auth::id(),
                'commande_id' => $request->commande_id,
                'sujet' => $request->sujet,
                'description' => $request->description,
                'statut' => 'en_attente',
                'reponse' => null,
                'traite_par' => null,
                'date_traitement' => null,
            ]);

            return response()->json([
                'message' => 'Réclamation créée avec succès',
                'reclamation' => $reclamation->load(['commande', 'user'])
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Récupérer les réclamations d'un utilisateur
     */
    public function index()
    {
        try {
            $reclamations = Reclamation::with(['commande', 'traitePar'])
                ->where('user_id', Auth::id())
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'reclamations' => $reclamations,
                'total' => $reclamations->count()
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Récupérer une réclamation spécifique
     */
    public function show($id)
    {
        try {
            $reclamation = Reclamation::with(['commande', 'traitePar'])
                ->where('id', $id)
                ->where('user_id', Auth::id())
                ->first();

            if (!$reclamation) {
                return response()->json([
                    'error' => 'Réclamation introuvable'
                ], 404);
            }

            return response()->json(['reclamation' => $reclamation]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Mettre à jour une réclamation (seulement si en attente)
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'sujet' => 'sometimes|string|max:255',
            'description' => 'sometimes|string|max:1000',
        ]);

        try {
            $reclamation = Reclamation::where('id', $id)
                ->where('user_id', Auth::id())
                ->first();

            if (!$reclamation) {
                return response()->json([
                    'error' => 'Réclamation introuvable'
                ], 404);
            }

            if ($reclamation->statut !== 'en_attente') {
                return response()->json([
                    'error' => 'Impossible de modifier une réclamation déjà traitée'
                ], 400);
            }

            $reclamation->update($request->only(['sujet', 'description']));

            return response()->json([
                'message' => 'Réclamation mise à jour avec succès',
                'reclamation' => $reclamation->load(['commande', 'traitePar'])
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Annuler une réclamation (seulement si en attente)
     */
    public function cancel($id)
    {
        try {
            $reclamation = Reclamation::where('id', $id)
                ->where('user_id', Auth::id())
                ->first();

            if (!$reclamation) {
                return response()->json([
                    'error' => 'Réclamation introuvable'
                ], 404);
            }

            if ($reclamation->statut !== 'en_attente') {
                return response()->json([
                    'error' => 'Impossible d\'annuler une réclamation déjà traitée'
                ], 400);
            }

            $reclamation->update(['statut' => 'annulee']);

            return response()->json([
                'message' => 'Réclamation annulée avec succès',
                'reclamation' => $reclamation
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Récupérer toutes les réclamations (pour les administrateurs)
     */
    public function getAll(Request $request)
    {
        try {
            $query = Reclamation::with(['commande', 'user', 'traitePar']);

            // Filtres optionnels
            if ($request->has('statut')) {
                $query->where('statut', $request->statut);
            }

            if ($request->has('user_id')) {
                $query->where('user_id', $request->user_id);
            }

            if ($request->has('date_debut')) {
                $query->whereDate('created_at', '>=', $request->date_debut);
            }

            if ($request->has('date_fin')) {
                $query->whereDate('created_at', '<=', $request->date_fin);
            }

            $reclamations = $query->orderBy('created_at', 'desc')->get();

            return response()->json([
                'reclamations' => $reclamations,
                'total' => $reclamations->count(),
                'filters' => $request->only(['statut', 'user_id', 'date_debut', 'date_fin'])
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Traiter une réclamation (pour les administrateurs)
     */
    public function process(Request $request, $id)
    {
        $request->validate([
            'statut' => 'required|in:en_cours,resolue,rejetee',
            'reponse' => 'required|string|max:1000',
        ]);

        try {
            $reclamation = Reclamation::findOrFail($id);

            if ($reclamation->statut !== 'en_attente') {
                return response()->json([
                    'error' => 'Cette réclamation a déjà été traitée'
                ], 400);
            }

            $reclamation->update([
                'statut' => $request->statut,
                'reponse' => $request->reponse,
                'traite_par' => Auth::id(),
                'date_traitement' => now(),
            ]);

            return response()->json([
                'message' => 'Réclamation traitée avec succès',
                'reclamation' => $reclamation->load(['commande', 'user', 'traitePar'])
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Obtenir les statistiques des réclamations (pour les administrateurs)
     */
    public function getStats()
    {
        try {
            $stats = [
                'total' => Reclamation::count(),
                'en_attente' => Reclamation::where('statut', 'en_attente')->count(),
                'en_cours' => Reclamation::where('statut', 'en_cours')->count(),
                'resolues' => Reclamation::where('statut', 'resolue')->count(),
                'rejetees' => Reclamation::where('statut', 'rejetee')->count(),
                'annulees' => Reclamation::where('statut', 'annulee')->count(),
            ];

            // Réclamations par mois (6 derniers mois)
            $reclamationsParMois = Reclamation::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as mois, COUNT(*) as total')
                ->where('created_at', '>=', now()->subMonths(6))
                ->groupBy('mois')
                ->orderBy('mois')
                ->get();

            return response()->json([
                'statistiques' => $stats,
                'evolution_mensuelle' => $reclamationsParMois
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Rechercher des réclamations (pour les administrateurs)
     */
    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|min:2',
            'type' => 'sometimes|in:sujet,description,user_email'
        ]);

        try {
            $query = Reclamation::with(['commande', 'user', 'traitePar']);

            $searchQuery = $request->query;
            $searchType = $request->type ?? 'all';

            switch ($searchType) {
                case 'sujet':
                    $query->where('sujet', 'LIKE', "%{$searchQuery}%");
                    break;
                case 'description':
                    $query->where('description', 'LIKE', "%{$searchQuery}%");
                    break;
                case 'user_email':
                    $query->whereHas('user', function($q) use ($searchQuery) {
                        $q->where('email', 'LIKE', "%{$searchQuery}%");
                    });
                    break;
                default:
                    $query->where(function($q) use ($searchQuery) {
                        $q->where('sujet', 'LIKE', "%{$searchQuery}%")
                          ->orWhere('description', 'LIKE', "%{$searchQuery}%")
                          ->orWhereHas('user', function($subQ) use ($searchQuery) {
                              $subQ->where('email', 'LIKE', "%{$searchQuery}%");
                          });
                    });
            }

            $reclamations = $query->orderBy('created_at', 'desc')->get();

            return response()->json([
                'reclamations' => $reclamations,
                'total' => $reclamations->count(),
                'search_query' => $searchQuery,
                'search_type' => $searchType
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
