<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;

echo "🔍 Structure de la table users :\n";
echo "================================\n";

$columns = DB::select("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users' ORDER BY ordinal_position");

foreach ($columns as $column) {
    echo "- {$column->column_name} ({$column->data_type})\n";
}

echo "\n🔧 Ajout des colonnes manquantes...\n";

// Ajouter les colonnes manquantes
try {
    DB::statement('ALTER TABLE users ADD COLUMN IF NOT EXISTS telephone VARCHAR(30)');
    echo "✅ Colonne 'telephone' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'telephone' : " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE users ADD COLUMN IF NOT EXISTS localisation VARCHAR(150)');
    echo "✅ Colonne 'localisation' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'localisation' : " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT \'etudiant\'');
    echo "✅ Colonne 'role' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'role' : " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE users ADD COLUMN IF NOT EXISTS statut_compte VARCHAR(20) DEFAULT \'actif\'');
    echo "✅ Colonne 'statut_compte' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'statut_compte' : " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE users ADD COLUMN IF NOT EXISTS points_fidelite INTEGER DEFAULT 0');
    echo "✅ Colonne 'points_fidelite' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'points_fidelite' : " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE users ADD COLUMN IF NOT EXISTS code_parrainage VARCHAR(50) UNIQUE');
    echo "✅ Colonne 'code_parrainage' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'code_parrainage' : " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE users ADD COLUMN IF NOT EXISTS id_parrain BIGINT REFERENCES users(id)');
    echo "✅ Colonne 'id_parrain' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'id_parrain' : " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE users ADD COLUMN IF NOT EXISTS poste VARCHAR(100)');
    echo "✅ Colonne 'poste' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'poste' : " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE users ADD COLUMN IF NOT EXISTS date_embauche DATE');
    echo "✅ Colonne 'date_embauche' ajoutée\n";
} catch (Exception $e) {
    echo "⚠️ Colonne 'date_embauche' : " . $e->getMessage() . "\n";
}

echo "\n🎉 Structure de la table users mise à jour !\n";
