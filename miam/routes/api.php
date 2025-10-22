<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FideliteController;
use App\Http\Controllers\ParrainageController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\EvenementController;
use App\Http\Controllers\ReclamationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ==================== AUTHENTIFICATION ====================

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return response()->json($request->user());
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
});


// ==================== UTILISATEURS ====================
Route::get('/utilisateurs', [UtilisateurController::class, 'index']);
Route::get('/utilisateurs/{id}', [UtilisateurController::class, 'show']);
Route::post('/utilisateurs', [UtilisateurController::class, 'store']);
Route::put('/utilisateurs/{id}', [UtilisateurController::class, 'update']);
Route::delete('/utilisateurs/{id}', [UtilisateurController::class, 'destroy']);

// ==================== MENUS ====================
Route::get('/menus', [MenuController::class, 'index']);
Route::get('/menus/{id}', [MenuController::class, 'show']);
Route::post('/menus', [MenuController::class, 'store']);
Route::put('/menus/{id}', [MenuController::class, 'update']);
Route::delete('/menus/{id}', [MenuController::class, 'destroy']);

// ==================== PRODUITS ====================
Route::get('/produits', [ProductController::class, 'index']);
Route::get('/produits/{id}', [ProductController::class, 'show']);
Route::post('/produits', [ProductController::class, 'store']);
Route::put('/produits/{id}', [ProductController::class, 'update']);
Route::delete('/produits/{id}', [ProductController::class, 'destroy']);

// ==================== CATÉGORIES ====================
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

// ==================== COMMANDES ====================
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/commandes', [CommandeController::class, 'index']);
    Route::get('/commandes/{id}', [CommandeController::class, 'show']);
    Route::post('/commandes', [CommandeController::class, 'store']);
    Route::post('/commandes/from-cart/{userId}', [CommandeController::class, 'createFromCart']);
    Route::put('/commandes/{id}', [CommandeController::class, 'update']);
    Route::delete('/commandes/{id}', [CommandeController::class, 'destroy']);
});

// ==================== PANIERS ====================
Route::middleware('auth:sanctum')->group(function () {
    // Route pour récupérer le panier de l'utilisateur connecté
    Route::get('/panier', [PanierController::class, 'showCurrentUser']);
    
    // Routes avec userId (pour compatibilité)
    Route::get('/paniers/{userId}', [PanierController::class, 'show']);
    Route::post('/paniers/{userId}/add', [PanierController::class, 'addProduct']);
    Route::delete('/paniers/{userId}/remove/{produitId}', [PanierController::class, 'removeProduct']);
    Route::delete('/paniers/{userId}/clear', [PanierController::class, 'clear']);
    
    // Routes simplifiées pour l'utilisateur connecté
    Route::post('/panier/add', [PanierController::class, 'addProductToCurrentUser']);
    Route::delete('/panier/remove/{produitId}', [PanierController::class, 'removeProductFromCurrentUser']);
    Route::delete('/panier/clear', [PanierController::class, 'clearCurrentUser']);
});

// ==================== POINTS DE FIDÉLITÉ ====================
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/fidelite/user/{userId}', [FideliteController::class, 'getUserPoints']);
    Route::post('/fidelite/add-points', [FideliteController::class, 'addPoints']);
    Route::post('/fidelite/use-points', [FideliteController::class, 'usePoints']);
    Route::post('/fidelite/calculate-from-order/{commandeId}', [FideliteController::class, 'calculatePointsFromOrder']);
    Route::get('/fidelite/history/{userId}', [FideliteController::class, 'getHistory']);
    Route::get('/fidelite/calculate-reduction/{userId}', [FideliteController::class, 'calculateReduction']);
    Route::post('/fidelite/use-for-reduction', [FideliteController::class, 'usePointsForReduction']);
});

// ==================== PARRAINAGE ====================
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/parrainage/generate-code/{userId}', [ParrainageController::class, 'generateCode']);
    Route::post('/parrainage/use-code', [ParrainageController::class, 'useCode']);
    Route::get('/parrainage/user/{userId}', [ParrainageController::class, 'getParrainages']);
    Route::get('/parrainage/history/{userId}', [ParrainageController::class, 'getHistory']);
    Route::get('/parrainage/check-code/{code}', [ParrainageController::class, 'checkCode']);
});

// ==================== PROMOTIONS ====================
Route::get('/promotions', [PromotionController::class, 'index']);
Route::get('/promotions/{id}', [PromotionController::class, 'show']);
Route::get('/promotions/expired', [PromotionController::class, 'expired']);
Route::get('/promotions/upcoming', [PromotionController::class, 'upcoming']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/promotions', [PromotionController::class, 'store']);
    Route::put('/promotions/{id}', [PromotionController::class, 'update']);
    Route::delete('/promotions/{id}', [PromotionController::class, 'destroy']);
    Route::post('/promotions/{id}/toggle', [PromotionController::class, 'toggle']);
});

// ==================== ÉVÉNEMENTS ====================
Route::get('/evenements', [EvenementController::class, 'index']);
Route::get('/evenements/{id}', [EvenementController::class, 'show']);
Route::get('/evenements/a-venir', [EvenementController::class, 'aVenir']);
Route::get('/evenements/en-cours', [EvenementController::class, 'enCours']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/evenements', [EvenementController::class, 'store']);
    Route::put('/evenements/{id}', [EvenementController::class, 'update']);
    Route::delete('/evenements/{id}', [EvenementController::class, 'destroy']);
    Route::post('/evenements/{id}/reserver', [EvenementController::class, 'reserverPlace']);
    Route::post('/evenements/{id}/annuler', [EvenementController::class, 'annulerReservation']);
});

// ==================== RÉCLAMATIONS ====================
Route::middleware('auth:sanctum')->group(function () {
    // Routes pour les utilisateurs
    Route::post('/reclamations', [ReclamationController::class, 'store']);
    Route::get('/reclamations', [ReclamationController::class, 'index']);
    Route::get('/reclamations/{id}', [ReclamationController::class, 'show']);
    Route::put('/reclamations/{id}', [ReclamationController::class, 'update']);
    Route::post('/reclamations/{id}/cancel', [ReclamationController::class, 'cancel']);
});

// Routes pour les administrateurs (sans middleware auth pour l'instant)
Route::get('/admin/reclamations', [ReclamationController::class, 'getAll']);
Route::post('/admin/reclamations/{id}/process', [ReclamationController::class, 'process']);
Route::get('/admin/reclamations/stats', [ReclamationController::class, 'getStats']);
Route::get('/admin/reclamations/search', [ReclamationController::class, 'search']);

// ==================== TEST ACCÈS PAR RÔLE ====================


// Accessible à admin OU gérant
Route::middleware(['auth:sanctum', 'role:administrateur,gerant'])->get('/gestion', function () {
    return response()->json([
        'message' => 'Bienvenue dans la gestion 👑',
        'user' => auth()->user(),
    ]);
});

Route::middleware(['auth:sanctum', 'role:etudiant'])->get('/etudiant/test', function () {
    return response()->json([
        'message' => 'Bienvenue étudiant 🎓',
        'user' => auth()->user()
    ]);
});


Route::middleware(['auth:sanctum', 'role:gerant'])->get('/gerant/test', function () {
    return response()->json([
        'message' => 'Bienvenue gérant 👨‍🍳',
        'user' => auth()->user()
    ]);
});


Route::middleware(['auth:sanctum', 'role:employe'])->get('/employe/test', function () {
    return response()->json([
        'message' => 'Bienvenue employé 👨‍💼',
        'user' => auth()->user()
    ]);
});



// TEST PRODUIT - Route temporaire
Route::post('/test-create-product', function (Request $request) {
    try {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric',
            'menu_id' => 'required|integer|exists:menu,id',
            'categorie_id' => 'required|integer|exists:categorie,id_categorie',
        ]);
        
        // Création directe
        $produit = \App\Models\Product::create($data);
        
        return response()->json([
            'message' => 'Produit créé avec succès! ✅',
            'produit' => $produit
        ], 201);
        
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'message' => 'Erreur de validation',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Erreur: ' . $e->getMessage()
        ], 500);
    }
});


// Dans routes/api.php - AJOUTEZ CE CODE
Route::get('/menus-fix', function () {
    try {
        $menus = DB::table('menu')->get();
        return response()->json([
            'message' => 'Menus récupérés via DB::table ✅',
            'menus' => $menus
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});