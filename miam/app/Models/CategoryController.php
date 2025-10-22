<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function index()
    {
        // Forcer le schéma public
        $categories = DB::table('public.categorie')->get();
        return response()->json($categories);
    }

    public function show($id)
    {
        $categorie = DB::table('public.categorie')->where('id_categorie', $id)->first();

        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        return response()->json($categorie);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nom_categorie' => 'required|string|max:255',
        ]);

        $id = DB::table('public.categorie')->insertGetId($data);

        return response()->json(['message' => 'Catégorie créée', 'id' => $id], 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'nom_categorie' => 'sometimes|string|max:255',
        ]);

        $updated = DB::table('public.categorie')->where('id_categorie', $id)->update($data);

        if (!$updated) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        return response()->json(['message' => 'Catégorie mise à jour']);
    }

    public function destroy($id)
    {
        $deleted = DB::table('public.categorie')->where('id_categorie', $id)->delete();

        if (!$deleted) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        return response()->json(['message' => 'Catégorie supprimée']);
    }
}