<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    /**
     * 📋 Liste tous les menus
     */
    public function index()
    {
        try {
            $menus = Menu::with('gerant')->get();
            
            return response()->json([
                'message' => 'Liste des menus récupérée avec succès ✅',
                'menus' => $menus,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des menus',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 🔍 Affiche un menu spécifique
     */
    public function show($id)
    {
        try {
            $menu = Menu::with('gerant')->find($id);

            if (!$menu) {
                return response()->json(['message' => 'Menu introuvable ❌'], 404);
            }

            return response()->json([
                'message' => 'Menu trouvé ✅',
                'menu' => $menu,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération du menu',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * ➕ Crée un nouveau menu (Gérant ou Admin seulement)
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        // 🔒 Vérifier que l'utilisateur est authentifié
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié ❌'], 401);
        }

        // 🔒 Vérifier que l'utilisateur est gérant ou administrateur
        if (!in_array($user->role, ['gerant', 'administrateur'])) {
            return response()->json([
                'message' => 'Accès refusé 🚫 – seuls les gérants ou administrateurs peuvent créer un menu.'
            ], 403);
        }

        // ✅ Validation des données
        $validated = $request->validate([
            'nom_plat' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric|min:0',
            'categorie' => 'required|string',
            'image' => 'nullable|string|max:255',
        ]);

        try {
            // 🔹 Créer le menu avec Eloquent
            $menu = Menu::create([
                'nom_plat' => $validated['nom_plat'],
                'description' => $validated['description'] ?? null,
                'prix' => $validated['prix'],
                'categorie' => $validated['categorie'],
                'image' => $validated['image'] ?? null,
                'id_gerant' => $user->id,
                'disponible' => true,
            ]);

            return response()->json([
                'message' => 'Menu créé avec succès ✅',
                'menu' => $menu->load('gerant'),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la création du menu',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 🔄 Met à jour un menu existant
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();

        // 🔒 Vérifier l'authentification
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié ❌'], 401);
        }

        // 🔍 Vérifier que le menu existe
        $menu = Menu::find($id);
        
        if (!$menu) {
            return response()->json(['message' => 'Menu introuvable ❌'], 404);
        }

        // 🔒 Vérifier les permissions (propriétaire ou admin)
        if ($user->id !== $menu->id_gerant && $user->role !== 'administrateur') {
            return response()->json(['message' => 'Accès refusé 🚫'], 403);
        }

        // ✅ Validation des données
        $validated = $request->validate([
            'nom_plat' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'sometimes|required|numeric|min:0',
            'categorie' => 'sometimes|required|string',
            'image' => 'nullable|string|max:255',
            'disponible' => 'sometimes|boolean',
        ]);

        try {
            // 🔹 Mise à jour avec Eloquent
            $menu->update($validated);

            return response()->json([
                'message' => 'Menu mis à jour avec succès ✅',
                'menu' => $menu->load('gerant'),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du menu',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 🗑️ Supprime un menu
     */
    public function destroy($id)
    {
        $user = Auth::user();

        // 🔒 Vérifier l'authentification
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié ❌'], 401);
        }

        // 🔍 Vérifier que le menu existe
        $menu = Menu::find($id);
        
        if (!$menu) {
            return response()->json(['message' => 'Menu introuvable ❌'], 404);
        }

        // 🔒 Vérifier les permissions (propriétaire ou admin)
        if ($user->id !== $menu->id_gerant && $user->role !== 'administrateur') {
            return response()->json(['message' => 'Accès refusé 🚫'], 403);
        }

        try {
            $menu->delete();

            return response()->json(['message' => 'Menu supprimé avec succès 🗑️']);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la suppression du menu',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}