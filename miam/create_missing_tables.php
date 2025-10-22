<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

echo "🔧 Création des tables manquantes...\n";
echo "====================================\n";

// Table categorie
if (!Schema::hasTable('categorie')) {
    Schema::create('categorie', function ($table) {
        $table->id('id_categorie');
        $table->string('nom_categorie')->unique();
        $table->text('description')->nullable();
        $table->timestamps();
    });
    echo "✅ Table 'categorie' créée\n";
    
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

// Table point_fidelites
if (!Schema::hasTable('point_fidelites')) {
    Schema::create('point_fidelites', function ($table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->integer('points_gagnes')->default(0);
        $table->integer('points_utilises')->default(0);
        $table->string('source')->nullable();
        $table->foreignId('commande_id')->nullable()->constrained()->onDelete('set null');
        $table->text('description')->nullable();
        $table->date('date_expiration')->nullable();
        $table->timestamps();
    });
    echo "✅ Table 'point_fidelites' créée\n";
}

// Table parrainages
if (!Schema::hasTable('parrainages')) {
    Schema::create('parrainages', function ($table) {
        $table->id();
        $table->foreignId('id_parrain')->constrained('users')->onDelete('cascade');
        $table->foreignId('id_filleul')->constrained('users')->onDelete('cascade');
        $table->string('code_utilise')->nullable();
        $table->boolean('recompense_attribuee')->default(false);
        $table->integer('points_parrainage')->default(0);
        $table->timestamps();
        
        $table->unique(['id_parrain', 'id_filleul']);
    });
    echo "✅ Table 'parrainages' créée\n";
}

// Table reclamations
if (!Schema::hasTable('reclamations')) {
    Schema::create('reclamations', function ($table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('commande_id')->nullable()->constrained()->onDelete('set null');
        $table->string('sujet');
        $table->text('description');
        $table->enum('statut', ['ouverte', 'en_cours', 'resolue', 'fermee'])->default('ouverte');
        $table->text('reponse')->nullable();
        $table->foreignId('traite_par')->nullable()->constrained('users')->onDelete('set null');
        $table->timestamp('date_traitement')->nullable();
        $table->timestamps();
    });
    echo "✅ Table 'reclamations' créée\n";
}

// Table evenements
if (!Schema::hasTable('evenements')) {
    Schema::create('evenements', function ($table) {
        $table->id();
        $table->string('nom');
        $table->text('description');
        $table->date('date_debut');
        $table->date('date_fin');
        $table->boolean('actif')->default(true);
        $table->string('image')->nullable();
        $table->timestamps();
    });
    echo "✅ Table 'evenements' créée\n";
}

echo "\n🎉 Toutes les tables sont créées !\n";
