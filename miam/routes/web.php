<?php 
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

//Route::get('/', function () {
  //  return 'Serveur Laravel opérationnel ✅';
//});

Route::get('/test-db', function () {
    try {
        // ✅ Ajout explicite du schéma "public"
        $users = DB::table('public.utilisateur')->get();
        return response()->json($users);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()]);
    }
});
