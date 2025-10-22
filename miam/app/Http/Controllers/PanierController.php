<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Panier;
use App\Models\LignePanier;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class PanierController extends Controller
{
    /**
     * 🔹 Récupérer le panier de l'utilisateur connecté
     */
    public function showCurrentUser(Request $request)
    {
        $userId = $request->user()->id;
        return $this->show($userId);
    }

    /**
     * 🔹 Récupérer le panier d'un utilisateur
     */
    public function show($userId)
    {
        $panier = Panier::with(['lignePaniers.produit'])
                        ->where('user_id', $userId)
                        ->first();

        if (!$panier) {
            // Créer un panier vide si inexistant
            $panier = Panier::create(['user_id' => $userId]);
        }

        return response()->json($panier->load(['lignePaniers.produit']));
    }

    /**
     * 🔹 Ajouter un produit au panier de l'utilisateur connecté
     */
    public function addProductToCurrentUser(Request $request)
    {
        $userId = $request->user()->id;
        return $this->addProduct($request, $userId);
    }

    /**
     * 🔹 Ajouter un produit au panier
     */
    public function addProduct(Request $request, $userId)
    {
        DB::beginTransaction();
        try {
            $data = $request->validate([
                'produit_id' => 'required|integer|exists:produits,id',
                'quantite' => 'required|integer|min:1'
            ]);

            // Récupérer ou créer le panier
            $panier = Panier::where('user_id', $userId)->first();
            if (!$panier) {
                $panier = Panier::create(['user_id' => $userId]);
            }

            // Vérifier si le produit est déjà dans le panier
            $lignePanier = LignePanier::where('panier_id', $panier->id)
                                    ->where('produit_id', $data['produit_id'])
                                    ->first();

            if ($lignePanier) {
                // Mettre à jour la quantité
                $lignePanier->update([
                    'quantite' => $lignePanier->quantite + $data['quantite']
                ]);
            } else {
                // Ajouter nouveau produit
                LignePanier::create([
                    'panier_id' => $panier->id,
                    'produit_id' => $data['produit_id'],
                    'quantite' => $data['quantite']
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Produit ajouté au panier ✅',
                'panier' => $panier->load(['lignePaniers.produit'])
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erreur lors de l\'ajout au panier ❌',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 🔹 Supprimer un produit du panier de l'utilisateur connecté
     */
    public function removeProductFromCurrentUser(Request $request, $produitId)
    {
        $userId = $request->user()->id;
        return $this->removeProduct($userId, $produitId);
    }

    /**
     * 🔹 Supprimer un produit du panier
     */
    public function removeProduct($userId, $produitId)
    {
        $panier = Panier::where('user_id', $userId)->first();

        if (!$panier) {
            return response()->json(['message' => 'Panier non trouvé ❌'], 404);
        }

        $lignePanier = LignePanier::where('panier_id', $panier->id)
                                ->where('produit_id', $produitId)
                                ->first();

        if (!$lignePanier) {
            return response()->json(['message' => 'Produit non trouvé dans le panier ❌'], 404);
        }

        $lignePanier->delete();

        return response()->json([
            'message' => 'Produit retiré du panier ✅',
            'panier' => $panier->load(['lignePaniers.produit'])
        ]);
    }

    /**
     * 🔹 Vider le panier de l'utilisateur connecté
     */
    public function clearCurrentUser(Request $request)
    {
        $userId = $request->user()->id;
        return $this->clear($userId);
    }

    /**
     * 🔹 Vider le panier
     */
    public function clear($userId)
    {
        $panier = Panier::where('user_id', $userId)->first();

        if (!$panier) {
            return response()->json(['message' => 'Panier non trouvé ❌'], 404);
        }

        LignePanier::where('panier_id', $panier->id)->delete();

        return response()->json([
            'message' => 'Panier vidé avec succès ✅',
            'panier' => $panier->load(['lignePaniers.produit'])
        ]);
    }
}