<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Promotion;
use Carbon\Carbon;

class PromotionController extends Controller
{
    /**
     * Récupérer toutes les promotions actives
     */
    public function index()
    {
        try {
            $promotions = Promotion::actives()->get();
            
            return response()->json([
                'promotions' => $promotions,
                'total' => $promotions->count()
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Récupérer une promotion spécifique
     */
    public function show($id)
    {
        try {
            $promotion = Promotion::findOrFail($id);
            
            return response()->json($promotion);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Créer une nouvelle promotion
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'pourcentage_reduction' => 'nullable|numeric|min:0|max:100',
            'montant_reduction' => 'nullable|numeric|min:0',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'actif' => 'boolean',
            'image' => 'nullable|string'
        ]);

        try {
            // Vérifier qu'au moins un type de réduction est fourni
            if (!$request->pourcentage_reduction && !$request->montant_reduction) {
                return response()->json([
                    'error' => 'Veuillez spécifier soit un pourcentage soit un montant de réduction'
                ], 400);
            }

            $promotion = Promotion::create($request->all());
            
            return response()->json([
                'message' => 'Promotion créée avec succès',
                'promotion' => $promotion
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Mettre à jour une promotion
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nom' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'pourcentage_reduction' => 'nullable|numeric|min:0|max:100',
            'montant_reduction' => 'nullable|numeric|min:0',
            'date_debut' => 'sometimes|date',
            'date_fin' => 'sometimes|date|after:date_debut',
            'actif' => 'boolean',
            'image' => 'nullable|string'
        ]);

        try {
            $promotion = Promotion::findOrFail($id);
            $promotion->update($request->all());
            
            return response()->json([
                'message' => 'Promotion mise à jour avec succès',
                'promotion' => $promotion
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Supprimer une promotion
     */
    public function destroy($id)
    {
        try {
            $promotion = Promotion::findOrFail($id);
            $promotion->delete();
            
            return response()->json([
                'message' => 'Promotion supprimée avec succès'
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Activer/Désactiver une promotion
     */
    public function toggle($id)
    {
        try {
            $promotion = Promotion::findOrFail($id);
            $promotion->update(['actif' => !$promotion->actif]);
            
            return response()->json([
                'message' => $promotion->actif ? 'Promotion activée' : 'Promotion désactivée',
                'promotion' => $promotion
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Récupérer les promotions expirées
     */
    public function expired()
    {
        try {
            $promotions = Promotion::where('date_fin', '<', now())
                ->orderBy('date_fin', 'desc')
                ->get();
            
            return response()->json([
                'promotions' => $promotions,
                'total' => $promotions->count()
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Récupérer les promotions à venir
     */
    public function upcoming()
    {
        try {
            $promotions = Promotion::where('date_debut', '>', now())
                ->orderBy('date_debut', 'asc')
                ->get();
            
            return response()->json([
                'promotions' => $promotions,
                'total' => $promotions->count()
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}