<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function show($id)
    {
        $categorie = Category::find($id);

        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        return response()->json($categorie);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nom_categorie' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $categorie = Category::create($data);

        return response()->json([
            'message' => 'Catégorie créée avec succès ✅',
            'categorie' => $categorie
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $categorie = Category::find($id);
        
        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        $data = $request->validate([
            'nom_categorie' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
        ]);

        $categorie->update($data);

        return response()->json([
            'message' => 'Catégorie mise à jour avec succès ✅',
            'categorie' => $categorie
        ]);
    }

    public function destroy($id)
    {
        $categorie = Category::find($id);
        
        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        $categorie->delete();

        return response()->json(['message' => 'Catégorie supprimée avec succès 🗑️']);
    }
}
