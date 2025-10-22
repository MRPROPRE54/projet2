<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PointFidelite;
use App\Models\User;
use App\Models\Commande;
use Illuminate\Support\Facades\DB;

class FideliteController extends Controller
{
    /**
     * Récupérer les points de fidélité d'un utilisateur
     */
    public function getUserPoints($userId)
    {
        try {
            $user = User::findOrFail($userId);
            
            // Calculer le total des points
            $totalPoints = PointFidelite::where('user_id', $userId)
                ->sum(DB::raw('points_gagnes - points_utilises'));
            
            // Récupérer l'historique des points
            $historique = PointFidelite::where('user_id', $userId)
                ->orderBy('created_at', 'desc')
                ->get();
            
            return response()->json([
                'user_id' => $userId,
                'total_points' => $totalPoints,
                'historique' => $historique
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Ajouter des points de fidélité
     */
    public function addPoints(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'points_gagnes' => 'required|integer|min:1',
            'source' => 'required|string',
            'description' => 'nullable|string',
            'commande_id' => 'nullable|exists:commandes,id'
        ]);

        try {
            $pointFidelite = PointFidelite::create([
                'user_id' => $request->user_id,
                'points_gagnes' => $request->points_gagnes,
                'points_utilises' => 0,
                'source' => $request->source,
                'description' => $request->description,
                'commande_id' => $request->commande_id,
                'date_expiration' => now()->addYear() // Points valides 1 an
            ]);

            return response()->json([
                'message' => 'Points ajoutés avec succès',
                'points' => $pointFidelite
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Utiliser des points de fidélité
     */
    public function usePoints(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'points_utilises' => 'required|integer|min:1'
        ]);

        try {
            // Vérifier que l'utilisateur a assez de points
            $totalPoints = PointFidelite::where('user_id', $request->user_id)
                ->sum(DB::raw('points_gagnes - points_utilises'));

            if ($totalPoints < $request->points_utilises) {
                return response()->json([
                    'error' => 'Points insuffisants',
                    'points_disponibles' => $totalPoints
                ], 400);
            }

            // Créer un enregistrement d'utilisation
            $pointFidelite = PointFidelite::create([
                'user_id' => $request->user_id,
                'points_gagnes' => 0,
                'points_utilises' => $request->points_utilises,
                'source' => 'utilisation',
                'description' => $request->description ?? 'Utilisation de points de fidélité'
            ]);

            return response()->json([
                'message' => 'Points utilisés avec succès',
                'points_utilises' => $request->points_utilises,
                'points_restants' => $totalPoints - $request->points_utilises
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Calculer les points à attribuer après une commande
     */
    public function calculatePointsFromOrder($commandeId)
    {
        try {
            $commande = Commande::with('ligneCommandes.produit')->findOrFail($commandeId);
            
            // 1000F dépensé = 1 point
            $points = intval($commande->total / 1000);
            
            if ($points > 0) {
                // Ajouter les points
                PointFidelite::create([
                    'user_id' => $commande->user_id,
                    'points_gagnes' => $points,
                    'points_utilises' => 0,
                    'source' => 'commande',
                    'description' => "Points gagnés pour la commande #{$commandeId} (1000F = 1 point)",
                    'commande_id' => $commandeId,
                    'date_expiration' => now()->addYear()
                ]);
            }

            return response()->json([
                'message' => 'Points calculés et ajoutés',
                'points_gagnes' => $points,
                'montant_commande' => $commande->total,
                'regle' => '1000F dépensé = 1 point'
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Récupérer l'historique des points d'un utilisateur
     */
    public function getHistory($userId)
    {
        try {
            $historique = PointFidelite::where('user_id', $userId)
                ->orderBy('created_at', 'desc')
                ->paginate(20);

            return response()->json($historique);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Calculer la réduction possible avec les points disponibles
     */
    public function calculateReduction($userId)
    {
        try {
            $totalPoints = PointFidelite::where('user_id', $userId)
                ->sum(DB::raw('points_gagnes - points_utilises'));

            // 15 points = 1000F de réduction
            $reductionPossible = intval($totalPoints / 15) * 1000;
            $pointsNecessaires = 15 - ($totalPoints % 15);

            return response()->json([
                'points_disponibles' => $totalPoints,
                'reduction_possible' => $reductionPossible,
                'points_pour_reduction_complete' => $pointsNecessaires,
                'regle' => '15 points = 1000F de réduction'
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Utiliser des points pour une réduction
     */
    public function usePointsForReduction(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'points_to_use' => 'required|integer|min:15'
        ]);

        try {
            // Vérifier que l'utilisateur a assez de points
            $totalPoints = PointFidelite::where('user_id', $request->user_id)
                ->sum(DB::raw('points_gagnes - points_utilises'));

            if ($totalPoints < $request->points_to_use) {
                return response()->json([
                    'error' => 'Points insuffisants',
                    'points_disponibles' => $totalPoints
                ], 400);
            }

            // Vérifier que c'est un multiple de 15
            if ($request->points_to_use % 15 !== 0) {
                return response()->json([
                    'error' => 'Le nombre de points doit être un multiple de 15',
                    'regle' => '15 points = 1000F de réduction'
                ], 400);
            }

            // Calculer la réduction
            $reduction = ($request->points_to_use / 15) * 1000;

            // Créer un enregistrement d'utilisation
            PointFidelite::create([
                'user_id' => $request->user_id,
                'points_gagnes' => 0,
                'points_utilises' => $request->points_to_use,
                'source' => 'reduction',
                'description' => "Utilisation de {$request->points_to_use} points pour {$reduction}F de réduction"
            ]);

            return response()->json([
                'message' => 'Points utilisés avec succès',
                'points_utilises' => $request->points_to_use,
                'reduction_obtenue' => $reduction,
                'points_restants' => $totalPoints - $request->points_to_use
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}