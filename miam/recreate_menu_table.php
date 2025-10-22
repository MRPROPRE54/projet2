<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

echo "🧹 Nettoyage et recréation de la table menu...\n";
echo "==============================================\n";

// Supprimer l'ancienne table
try {
    DB::statement('DROP TABLE IF EXISTS menu CASCADE');
    echo "✅ Ancienne table 'menu' supprimée\n";
} catch (Exception $e) {
    echo "⚠️ Erreur suppression : " . $e->getMessage() . "\n";
}

// Recréer la table avec la bonne structure
try {
    DB::statement('
        CREATE TABLE menu (
            id_menu SERIAL PRIMARY KEY,
            nom_plat VARCHAR(255) NOT NULL,
            description TEXT,
            prix DECIMAL(8,2) NOT NULL,
            categorie VARCHAR(255) NOT NULL,
            image VARCHAR(255),
            id_gerant BIGINT,
            disponible BOOLEAN DEFAULT true,
            date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ');
    echo "✅ Nouvelle table 'menu' créée\n";
} catch (Exception $e) {
    echo "❌ Erreur création : " . $e->getMessage() . "\n";
}

// Ajouter quelques données de test
try {
    $menus = [
        [
            'nom_plat' => 'Poulet Braisé',
            'description' => 'Poulet braisé aux épices locales',
            'prix' => 2500,
            'categorie' => 'plat',
            'image' => 'poulet.jpg',
            'id_gerant' => 1,
            'disponible' => true
        ],
        [
            'nom_plat' => 'Poisson Grillé',
            'description' => 'Poisson frais grillé aux herbes',
            'prix' => 3000,
            'categorie' => 'plat',
            'image' => 'poisson.jpg',
            'id_gerant' => 1,
            'disponible' => true
        ],
        [
            'nom_plat' => 'Coca Cola',
            'description' => 'Boisson gazeuse',
            'prix' => 500,
            'categorie' => 'boisson',
            'image' => 'coca.jpg',
            'id_gerant' => 1,
            'disponible' => true
        ]
    ];
    
    foreach ($menus as $menu) {
        DB::table('menu')->insert($menu);
    }
    echo "✅ Données de test insérées\n";
} catch (Exception $e) {
    echo "⚠️ Erreur insertion données : " . $e->getMessage() . "\n";
}

echo "\n🔍 Vérification finale...\n";
$columns = DB::select("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'menu' ORDER BY ordinal_position");

echo "Structure finale de la table menu :\n";
foreach ($columns as $column) {
    echo "- {$column->column_name} ({$column->data_type})\n";
}

$count = DB::table('menu')->count();
echo "\nNombre de menus : $count\n";

echo "\n🎉 Table menu nettoyée et prête !\n";
