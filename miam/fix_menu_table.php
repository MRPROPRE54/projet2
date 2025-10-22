<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

echo "🔍 Vérification de la structure de la table menu...\n";
echo "==================================================\n";

// Vérifier les colonnes actuelles
$columns = DB::select("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'menu' ORDER BY ordinal_position");

echo "Colonnes actuelles de la table menu :\n";
foreach ($columns as $column) {
    echo "- {$column->column_name} ({$column->data_type})\n";
}

echo "\n🔧 Correction de la structure...\n";

// Ajouter les colonnes manquantes
try {
    DB::statement('ALTER TABLE menu ADD COLUMN IF NOT EXISTS nom_plat VARCHAR(255)');
    echo "✅ Colonne 'nom_plat' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'nom_plat' : " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE menu ADD COLUMN IF NOT EXISTS description TEXT');
    echo "✅ Colonne 'description' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'description' : " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE menu ADD COLUMN IF NOT EXISTS prix DECIMAL(8,2)');
    echo "✅ Colonne 'prix' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'prix' : " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE menu ADD COLUMN IF NOT EXISTS categorie VARCHAR(255)');
    echo "✅ Colonne 'categorie' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'categorie' : " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE menu ADD COLUMN IF NOT EXISTS image VARCHAR(255)');
    echo "✅ Colonne 'image' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'image' : " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE menu ADD COLUMN IF NOT EXISTS id_gerant BIGINT');
    echo "✅ Colonne 'id_gerant' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'id_gerant' : " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE menu ADD COLUMN IF NOT EXISTS disponible BOOLEAN DEFAULT true');
    echo "✅ Colonne 'disponible' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'disponible' : " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE menu ADD COLUMN IF NOT EXISTS date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
    echo "✅ Colonne 'date_ajout' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'date_ajout' : " . $e->getMessage() . "\n";
}

echo "\n🔍 Vérification finale...\n";
$columns = DB::select("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'menu' ORDER BY ordinal_position");

echo "Nouvelles colonnes de la table menu :\n";
foreach ($columns as $column) {
    echo "- {$column->column_name} ({$column->data_type})\n";
}

echo "\n🎉 Structure de la table menu corrigée !\n";
