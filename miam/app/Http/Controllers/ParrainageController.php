<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Parrainage;
use App\Models\User;
use App\Models\PointFidelite;
use Illuminate\Support\Str;

class ParrainageController extends Controller
{
    /**
     * Générer un code de parrainage pour un utilisateur
     */
    public function generateCode($userId)
    {
        try {
            $user = User::findOrFail($userId);
            
            // Vérifier si l'utilisateur a déjà un code
            $existingParrainage = Parrainage::where('id_parrain', $userId)->first();
            
            if ($existingParrainage) {
                return response()->json([
                    'message' => 'Code de parrainage déjà existant',
                    'code' => $existingParrainage->code_utilise
                ]);
            }
            
            // Générer un code unique
            $code = strtoupper(Str::random(8));
            
            // Créer l'enregistrement de parrainage
            $parrainage = Parrainage::create([
                'id_parrain' => $userId,
                'id_filleul' => null,
                'code_utilise' => $code,
                'recompense_attribuee' => false,
                'points_parrainage' => 45 // 45 points pour le parrain
            ]);
            
            return response()->json([
                'message' => 'Code de parrainage généré avec succès',
                'code' => $code,
                'points_gagnés' => 45
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Utiliser un code de parrainage
     */
    public function useCode(Request $request)
    {
        $request->validate([
            'code' => 'required|string|size:8',
            'filleul_id' => 'required|exists:users,id'
        ]);

        try {
            // Vérifier que le code existe et n'a pas été utilisé
            $parrainage = Parrainage::where('code_utilise', $request->code)
                ->whereNull('id_filleul')
                ->first();

            if (!$parrainage) {
                return response()->json([
                    'error' => 'Code de parrainage invalide ou déjà utilisé'
                ], 400);
            }

            // Vérifier que l'utilisateur ne s'parraine pas lui-même
            if ($parrainage->id_parrain == $request->filleul_id) {
                return response()->json([
                    'error' => 'Vous ne pouvez pas utiliser votre propre code de parrainage'
                ], 400);
            }

            // Mettre à jour le parrainage
            $parrainage->update([
                'id_filleul' => $request->filleul_id,
                'recompense_attribuee' => true
            ]);

            // Attribuer les points au parrain
            PointFidelite::create([
                'user_id' => $parrainage->id_parrain,
                'points_gagnes' => $parrainage->points_parrainage,
                'points_utilises' => 0,
                'source' => 'parrainage',
                'description' => "Points gagnés pour avoir parrainé l'utilisateur #{$request->filleul_id}",
                'date_expiration' => now()->addYear()
            ]);

            // Attribuer des points bonus au filleul
            PointFidelite::create([
                'user_id' => $request->filleul_id,
                'points_gagnes' => 20, // 20 points bonus pour le filleul
                'points_utilises' => 0,
                'source' => 'parrainage',
                'description' => "Points bonus pour avoir utilisé un code de parrainage",
                'date_expiration' => now()->addYear()
            ]);

            return response()->json([
                'message' => 'Code de parrainage utilisé avec succès',
                'parrain_id' => $parrainage->id_parrain,
                'filleul_id' => $request->filleul_id,
                'points_parrain' => $parrainage->points_parrainage,
                'points_filleul' => 20
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Récupérer les parrainages d'un utilisateur (en tant que parrain)
     */
    public function getParrainages($userId)
    {
        try {
            $parrainages = Parrainage::with(['filleul'])
                ->where('id_parrain', $userId)
                ->whereNotNull('id_filleul')
                ->get();

            return response()->json([
                'parrainages' => $parrainages,
                'total_parrainages' => $parrainages->count()
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Récupérer l'historique de parrainage d'un utilisateur
     */
    public function getHistory($userId)
    {
        try {
            // Parrainages où l'utilisateur est parrain
            $asParrain = Parrainage::with(['filleul'])
                ->where('id_parrain', $userId)
                ->get();

            // Parrainages où l'utilisateur est filleul
            $asFilleul = Parrainage::with(['parrain'])
                ->where('id_filleul', $userId)
                ->get();

            return response()->json([
                'as_parrain' => $asParrain,
                'as_filleul' => $asFilleul,
                'total_parrainages' => $asParrain->count(),
                'total_filleuls' => $asFilleul->count()
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Vérifier si un code de parrainage est valide
     */
    public function checkCode($code)
    {
        try {
            $parrainage = Parrainage::where('code_utilise', $code)->first();

            if (!$parrainage) {
                return response()->json([
                    'valid' => false,
                    'message' => 'Code de parrainage introuvable'
                ]);
            }

            if ($parrainage->id_filleul) {
                return response()->json([
                    'valid' => false,
                    'message' => 'Code de parrainage déjà utilisé'
                ]);
            }

            return response()->json([
                'valid' => true,
                'message' => 'Code de parrainage valide',
                'parrain' => $parrainage->parrain
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}