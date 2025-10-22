<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Créer dans le schéma public
        DB::statement('SET search_path TO public');
        
        if (!Schema::hasTable('categorie')) {
            Schema::create('categorie', function (Blueprint $table) {
                $table->id('id_categorie');
                $table->string('nom_categorie')->unique();
                $table->text('description')->nullable();
                $table->timestamps();
            });
            echo "✅ Table categorie créée dans public\n";
            
            // Insérer des catégories de base
            $categories = [
                ['nom_categorie' => 'entree', 'description' => 'Entrées'],
                ['nom_categorie' => 'plat', 'description' => 'Plats principaux'],
                ['nom_categorie' => 'dessert', 'description' => 'Desserts'],
                ['nom_categorie' => 'boisson', 'description' => 'Boissons'],
                ['nom_categorie' => 'fast food', 'description' => 'Fast food'],
                ['nom_categorie' => 'spécialité', 'description' => 'Spécialités maison'],
            ];
            
            foreach ($categories as $categorie) {
                DB::table('categorie')->insert($categorie);
            }
            echo "✅ Catégories de base insérées\n";
        }
    }

    public function down(): void
    {
        DB::statement('SET search_path TO public');
        Schema::dropIfExists('categorie');
    }
};