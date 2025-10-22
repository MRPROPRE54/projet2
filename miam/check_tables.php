<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

echo "🔍 Vérification des tables importantes...\n";
echo "==========================================\n";

$tables = [
    'users' => 'Utilisateurs',
    'menu' => 'Menu',
    'produits' => 'Produits', 
    'categorie' => 'Catégories',
    'commandes' => 'Commandes',
    'ligne_commandes' => 'Lignes de commandes',
    'paniers' => 'Paniers',
    'ligne_paniers' => 'Lignes de paniers',
    'point_fidelites' => 'Points de fidélité',
    'parrainages' => 'Parrainages',
    'reclamations' => 'Réclamations',
    'evenements' => 'Événements'
];

foreach ($tables as $table => $description) {
    $exists = Schema::hasTable($table);
    $status = $exists ? '✅' : '❌';
    echo sprintf("%-20s %s %s\n", $description, $status, $table);
}

echo "\n🎯 Résumé :\n";
$existing = array_filter($tables, fn($desc, $table) => Schema::hasTable($table), ARRAY_FILTER_USE_BOTH);
$missing = array_filter($tables, fn($desc, $table) => !Schema::hasTable($table), ARRAY_FILTER_USE_BOTH);

echo "✅ Tables existantes : " . count($existing) . "\n";
echo "❌ Tables manquantes : " . count($missing) . "\n";

if (count($missing) > 0) {
    echo "\nTables manquantes :\n";
    foreach ($missing as $table => $desc) {
        echo "- $desc ($table)\n";
    }
}

echo "\n🚀 Prêt pour les tests !\n";
