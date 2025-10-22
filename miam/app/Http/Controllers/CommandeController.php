<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use App\Models\LigneCommande;
use App\Models\Product;
use App\Models\Panier; // Ajout du modèle Panier
use App\Models\LignePanier; // Ajout du modèle LignePanier
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CommandeController extends Controller
{
    /**
     * 🔹 Lister toutes les commandes
     */
    public function index()
    {
        // Charger les relations nécessaires pour l'affichage complet
        $commandes = Commande::with(['user', 'ligneCommandes.produit'])->get();
        return response()->json($commandes);
    }

    /**
     * 🔹 Afficher une commande spécifique
     */
    public function show($id)
    {
        $commande = Commande::with(['user', 'ligneCommandes.produit'])->find($id);

        if (!$commande) {
            return response()->json(['message' => 'Commande non trouvée ❌'], 404);
        }

        return response()->json($commande);
    }

    /**
     * 🛒 Créer une nouvelle commande à partir d'un panier
     * Récupère le contenu du panier de l'utilisateur, crée la commande, et vide le panier.
     */
    public function createFromCart(Request $request, $userId)
    {
        DB::beginTransaction();
        try {
            // 1. Validation des données de la commande (adresse, heure, etc.)
            $data = $request->validate([
                'type' => 'required|in:sur_place,livraison',
                'commentaire' => 'nullable|string',
                'adresse_livraison' => 'nullable|string|required_if:type,livraison',
                'heure_souhaitee' => 'nullable|date',
            ]);

            // 2. Récupérer le panier de l'utilisateur
            $panier = Panier::with('lignePaniers.produit')->where('user_id', $userId)->first();

            if (!$panier || $panier->lignePaniers->isEmpty()) {
                DB::rollBack();
                return response()->json(['message' => 'Le panier est vide ou inexistant 🛒'], 400);
            }

            // 3. Calculer le montant total et préparer les lignes de commande
            $montantTotal = 0;
            $lignesCommandeData = [];
            $panierLignes = $panier->lignePaniers;

            // Récupérer les prix actuels des produits pour garantir l'exactitude des prix au moment de la commande
            $produitIds = $panierLignes->pluck('produit_id')->toArray();
            $prixProduits = Product::whereIn('id', $produitIds)->pluck('prix', 'id')->toArray();
            
            foreach ($panierLignes as $lignePanier) {
                $produitId = $lignePanier->produit_id;
                $quantite = $lignePanier->quantite;
                $prixUnitaire = $prixProduits[$produitId] ?? 0; // Prix actuel
                
                if ($prixUnitaire == 0) {
                     // Gérer le cas où un produit n'existe plus
                     DB::rollBack();
                     return response()->json(['message' => "Erreur: Le produit ID {$produitId} n'existe plus ou n'a pas de prix. ❌"], 404);
                }

                $sousTotal = $prixUnitaire * $quantite;
                $montantTotal += $sousTotal;

                $lignesCommandeData[] = [
                    'produit_id' => $produitId,
                    'quantite' => $quantite,
                    'prix_unitaire' => $prixUnitaire,
                    'sous_total' => $sousTotal,
                ];
            }

            // 4. Créer la commande
            $commande = Commande::create([
                'user_id' => $userId,
                'montant_total' => $montantTotal,
                'statut' => 'en_attente', // Statut initial
                'type' => $data['type'],
                'commentaire' => $data['commentaire'] ?? null,
                'adresse_livraison' => $data['adresse_livraison'] ?? null,
                'heure_souhaitee' => $data['heure_souhaitee'] ?? null,
            ]);

            // 5. Créer les lignes de commande
            foreach ($lignesCommandeData as $ligneData) {
                $commande->ligneCommandes()->create($ligneData);
            }
            
            // 6. Supprimer le panier et ses lignes
            LignePanier::where('panier_id', $panier->id)->delete();
            $panier->delete(); 


            DB::commit();

            return response()->json([
                'message' => 'Commande créée avec succès à partir du panier ✅',
                'commande' => $commande->load(['ligneCommandes.produit'])
            ], 201);

        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erreur de validation ❌', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erreur lors de la création de la commande ❌',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * 🔹 Créer une nouvelle commande (à partir d'une liste de produits dans le corps de la requête - Ancienne méthode)
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->validate([
                'user_id' => 'required|integer|exists:users,id',
                'type' => 'required|in:sur_place,livraison',
                'commentaire' => 'nullable|string',
                'adresse_livraison' => 'nullable|string|required_if:type,livraison',
                'heure_souhaitee' => 'nullable|date',
                'produits' => 'required|array|min:1',
                'produits.*.produit_id' => 'required|integer|exists:produits,id',
                'produits.*.quantite' => 'required|integer|min:1',
            ]);

            $montantTotal = 0;
            $lignesCommandeData = [];

            // Récupérer les prix actuels des produits
            $produitIds = collect($data['produits'])->pluck('produit_id')->unique()->toArray();
            $prixProduits = Product::whereIn('id', $produitIds)->pluck('prix', 'id')->toArray();

            foreach ($data['produits'] as $item) {
                $produitId = $item['produit_id'];
                $quantite = $item['quantite'];
                $prixUnitaire = $prixProduits[$produitId] ?? 0; 
                
                if ($prixUnitaire == 0) {
                     DB::rollBack();
                     return response()->json(['message' => "Erreur: Le produit ID {$produitId} n'existe plus ou n'a pas de prix. ❌"], 404);
                }

                $sousTotal = $prixUnitaire * $quantite;
                $montantTotal += $sousTotal;

                $lignesCommandeData[] = [
                    'produit_id' => $produitId,
                    'quantite' => $quantite,
                    'prix_unitaire' => $prixUnitaire,
                    'sous_total' => $sousTotal,
                ];
            }

            // Créer la commande
            $commande = Commande::create([
                'user_id' => $data['user_id'],
                'montant_total' => $montantTotal,
                'statut' => 'en_attente', 
                'type' => $data['type'],
                'commentaire' => $data['commentaire'] ?? null,
                'adresse_livraison' => $data['adresse_livraison'] ?? null,
                'heure_souhaitee' => $data['heure_souhaitee'] ?? null,
            ]);

            // Créer les lignes de commande
            foreach ($lignesCommandeData as $ligneData) {
                $commande->ligneCommandes()->create($ligneData);
            }

            DB::commit();

            return response()->json([
                'message' => 'Commande créée avec succès ✅',
                'commande' => $commande->load(['ligneCommandes.produit'])
            ], 201);

        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erreur de validation ❌', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erreur lors de la création de la commande ❌',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * 🔹 Mettre à jour une commande (statut)
     */
    public function update(Request $request, $id)
    {
        $commande = Commande::find($id);

        if (!$commande) {
            return response()->json(['message' => 'Commande non trouvée ❌'], 404);
        }

        $data = $request->validate([
            'statut' => 'sometimes|in:en_attente,confirmee,en_preparation,prete,livree,annulee'
        ]);

        $commande->update($data);

        return response()->json([
            'message' => 'Commande mise à jour avec succès ✅',
            'commande' => $commande
        ]);
    }

    /**
     * 🔹 Supprimer une commande
     */
    public function destroy($id)
    {
        $commande = Commande::find($id);

        if (!$commande) {
            return response()->json(['message' => 'Commande non trouvée ❌'], 404);
        }
        
        // Supprimer d'abord les lignes de commande associées pour garantir l'intégrité (même si les cascades sont configurées)
        LigneCommande::where('commande_id', $id)->delete();

        $commande->delete();

        return response()->json(['message' => 'Commande supprimée avec succès 🗑️']);
    }
}
