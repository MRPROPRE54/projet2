<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

echo "🔧 Création de la table menu avec Laravel Schema...\n";
echo "==================================================\n";

// Créer la table avec Laravel Schema
Schema::create('menu', function ($table) {
    $table->id('id_menu');
    $table->string('nom_plat');
    $table->text('description')->nullable();
    $table->decimal('prix', 8, 2);
    $table->string('categorie');
    $table->string('image')->nullable();
    $table->unsignedBigInteger('id_gerant')->nullable();
    $table->boolean('disponible')->default(true);
    $table->timestamp('date_ajout')->useCurrent();
    $table->timestamps();
});

echo "✅ Table 'menu' créée avec Laravel Schema\n";

// Insérer des données de test
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

// Vérifier la structure
$columns = DB::select("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'menu' ORDER BY ordinal_position");

echo "\nStructure de la table menu :\n";
foreach ($columns as $column) {
    echo "- {$column->column_name} ({$column->data_type})\n";
}

$count = DB::table('menu')->count();
echo "\nNombre de menus : $count\n";

echo "\n🎉 Table menu créée et prête !\n";
