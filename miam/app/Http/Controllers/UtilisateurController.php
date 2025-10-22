<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UtilisateurController extends Controller
{
    /**
     * Afficher la liste de tous les utilisateurs.
     */
    public function index()
    {
        // Récupère tous les utilisateurs
        $utilisateurs = Utilisateur::all();

        return response()->json([
            'success' => true,
            'data' => $utilisateurs
        ], 200);
    }

    /**
     * Enregistrer un nouvel utilisateur.
     */
    public function store(Request $request)
    {
        try {
            // Validation des données
            $validated = $request->validate([
                'nom' => 'required|string|max:100',
                'email' => 'required|email|unique:utilisateur,email',
                'mot_de_passe' => 'required|string|min:6',
                'telephone' => 'nullable|string|max:30',
                'type_utilisateur' => 'required|in:etudiant,employe,gerant,administrateur',
            ]);

            // Création de l'utilisateur
            $utilisateur = Utilisateur::create([
                'nom' => $validated['nom'],
                'email' => $validated['email'],
                'mot_de_passe_hash' => Hash::make($validated['mot_de_passe']),
                'telephone' => $validated['telephone'] ?? null,
                'type_utilisateur' => $validated['type_utilisateur'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Utilisateur créé avec succès ✅',
                'data' => $utilisateur
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur interne du serveur',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Afficher un utilisateur spécifique.
     */
    public function show($id)
    {
        $utilisateur = Utilisateur::find($id);

        if (!$utilisateur) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non trouvé ❌'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $utilisateur
        ], 200);
    }

    /**
     * Mettre à jour un utilisateur.
     */
    public function update(Request $request, $id)
    {
        $utilisateur = Utilisateur::find($id);

        if (!$utilisateur) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non trouvé ❌'
            ], 404);
        }

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:100',
            'email' => 'sometimes|email|unique:utilisateur,email,' . $id . ',id_utilisateur',
            'mot_de_passe' => 'sometimes|string|min:6',
            'telephone' => 'nullable|string|max:30',
            'type_utilisateur' => 'sometimes|in:etudiant,employe,gerant,administrateur',
        ]);

        // Mettre à jour les champs autorisés
        if (isset($validated['mot_de_passe'])) {
            $validated['mot_de_passe_hash'] = Hash::make($validated['mot_de_passe']);
            unset($validated['mot_de_passe']);
        }

        $utilisateur->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Utilisateur mis à jour avec succès ✅',
            'data' => $utilisateur
        ], 200);
    }

    /**
     * Supprimer un utilisateur.
     */
    public function destroy($id)
    {
        $utilisateur = Utilisateur::find($id);

        if (!$utilisateur) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non trouvé ❌'
            ], 404);
        }

        $utilisateur->delete();

        return response()->json([
            'success' => true,
            'message' => 'Utilisateur supprimé avec succès 🗑️'
        ], 200);
    }
}
