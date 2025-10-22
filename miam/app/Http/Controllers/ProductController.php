<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $produits = Product::all();
        return response()->json($produits);
    }

    public function show($id)
    {
        $produit = Product::find($id);

        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé ❌'], 404);
        }

        return response()->json($produit);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric|min:0',
            'menu_id' => 'nullable|integer|exists:menu,id_menu',
            'categorie_id' => 'nullable|integer|exists:categorie,id_categorie',
            'disponible' => 'boolean',
        ]);

        $produit = Product::create($data);

        return response()->json([
            'message' => 'Produit créé avec succès ✅',
            'produit' => $produit,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $produit = Product::find($id);
        
        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé ❌'], 404);
        }

        $data = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'sometimes|required|numeric|min:0',
            'menu_id' => 'nullable|integer|exists:menu,id_menu',
            'categorie_id' => 'nullable|integer|exists:categorie,id_categorie',
            'disponible' => 'boolean',
        ]);

        $produit->update($data);

        return response()->json([
            'message' => 'Produit mis à jour avec succès ✅',
            'produit' => $produit
        ]);
    }

    public function destroy($id)
    {
        $produit = Product::find($id);
        
        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé ❌'], 404);
        }

        $produit->delete();

        return response()->json(['message' => 'Produit supprimé avec succès 🗑️']);
    }
}