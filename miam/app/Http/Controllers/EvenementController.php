<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evenement;
use Carbon\Carbon;

class EvenementController extends Controller
{
    /**
     * Récupérer tous les événements
     */
    public function index(Request $request)
    {
        try {
            $query = Evenement::query();

            // Filtres
            if ($request->has('actif')) {
                $query->where('actif', $request->boolean('actif'));
            }

            if ($request->has('statut')) {
                switch ($request->statut) {
                    case 'a_venir':
                        $query->aVenir();
                        break;
                    case 'en_cours':
                        $query->enCours();
                        break;
                    case 'passes':
                        $query->passes();
                        break;
                }
            }

            if ($request->has('gratuit')) {
                if ($request->boolean('gratuit')) {
                    $query->where(function($q) {
                        $q->whereNull('prix')->orWhere('prix', 0);
                    });
                } else {
                    $query->where('prix', '>', 0);
                }
            }

            $evenements = $query->orderBy('date_debut', 'asc')->get();

            return response()->json([
                'evenements' => $evenements,
                'total' => $evenements->count()
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Récupérer un événement spécifique
     */
    public function show($id)
    {
        try {
            $evenement = Evenement::findOrFail($id);
            
            return response()->json($evenement);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Créer un nouvel événement
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'heure_debut' => 'nullable|date_format:H:i',
            'heure_fin' => 'nullable|date_format:H:i|after:heure_debut',
            'lieu' => 'nullable|string|max:255',
            'prix' => 'nullable|numeric|min:0',
            'places_limitees' => 'nullable|integer|min:1',
            'actif' => 'boolean',
            'image' => 'nullable|string',
            'details_supplementaires' => 'nullable|array'
        ]);

        try {
            $evenement = Evenement::create($request->all());
            
            return response()->json([
                'message' => 'Événement créé avec succès',
                'evenement' => $evenement
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Mettre à jour un événement
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nom' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'date_debut' => 'sometimes|date',
            'date_fin' => 'sometimes|date|after_or_equal:date_debut',
            'heure_debut' => 'nullable|date_format:H:i',
            'heure_fin' => 'nullable|date_format:H:i|after:heure_debut',
            'lieu' => 'nullable|string|max:255',
            'prix' => 'nullable|numeric|min:0',
            'places_limitees' => 'nullable|integer|min:1',
            'actif' => 'boolean',
            'image' => 'nullable|string',
            'details_supplementaires' => 'nullable|array'
        ]);

        try {
            $evenement = Evenement::findOrFail($id);
            $evenement->update($request->all());
            
            return response()->json([
                'message' => 'Événement mis à jour avec succès',
                'evenement' => $evenement
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Supprimer un événement
     */
    public function destroy($id)
    {
        try {
            $evenement = Evenement::findOrFail($id);
            $evenement->delete();
            
            return response()->json([
                'message' => 'Événement supprimé avec succès'
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Réserver une place pour un événement
     */
    public function reserverPlace(Request $request, $id)
    {
        $request->validate([
            'nombre_places' => 'required|integer|min:1'
        ]);

        try {
            $evenement = Evenement::findOrFail($id);
            
            // Vérifier si l'événement est actif
            if (!$evenement->actif) {
                return response()->json([
                    'error' => 'Cet événement n\'est pas actif'
                ], 400);
            }

            // Vérifier si l'événement est à venir
            if ($evenement->date_debut < now()) {
                return response()->json([
                    'error' => 'Cet événement a déjà commencé'
                ], 400);
            }

            // Vérifier les places disponibles
            if ($evenement->places_limitees) {
                $placesDisponibles = $evenement->places_limitees - $evenement->places_reservees;
                
                if ($request->nombre_places > $placesDisponibles) {
                    return response()->json([
                        'error' => 'Places insuffisantes',
                        'places_disponibles' => $placesDisponibles
                    ], 400);
                }
            }

            // Mettre à jour le nombre de places réservées
            $evenement->increment('places_reservees', $request->nombre_places);
            
            return response()->json([
                'message' => 'Places réservées avec succès',
                'places_reservees' => $request->nombre_places,
                'places_restantes' => $evenement->places_limitees ? 
                    $evenement->places_limitees - $evenement->places_reservees : null
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Annuler une réservation
     */
    public function annulerReservation(Request $request, $id)
    {
        $request->validate([
            'nombre_places' => 'required|integer|min:1'
        ]);

        try {
            $evenement = Evenement::findOrFail($id);
            
            // Vérifier qu'il y a assez de places réservées
            if ($evenement->places_reservees < $request->nombre_places) {
                return response()->json([
                    'error' => 'Nombre de places à annuler supérieur aux places réservées'
                ], 400);
            }

            // Décrémenter le nombre de places réservées
            $evenement->decrement('places_reservees', $request->nombre_places);
            
            return response()->json([
                'message' => 'Réservation annulée avec succès',
                'places_annulees' => $request->nombre_places,
                'places_restantes' => $evenement->places_limitees ? 
                    $evenement->places_limitees - $evenement->places_reservees : null
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Récupérer les événements à venir
     */
    public function aVenir()
    {
        try {
            $evenements = Evenement::actifs()->aVenir()->orderBy('date_debut', 'asc')->get();
            
            return response()->json([
                'evenements' => $evenements,
                'total' => $evenements->count()
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Récupérer les événements en cours
     */
    public function enCours()
    {
        try {
            $evenements = Evenement::actifs()->enCours()->orderBy('date_debut', 'asc')->get();
            
            return response()->json([
                'evenements' => $evenements,
                'total' => $evenements->count()
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}