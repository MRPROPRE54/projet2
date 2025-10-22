<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

echo "🔧 Création d'un utilisateur de test...\n";

// Supprimer l'ancien utilisateur s'il existe
User::where('email', 'test@example.com')->delete();

// Créer un nouvel utilisateur
$user = User::create([
    'name' => 'Test User',
    'email' => 'test@example.com',
    'password' => Hash::make('Password123'),
    'role' => 'etudiant',
    'telephone' => '123456789',
    'localisation' => 'Douala',
]);

echo "✅ Utilisateur créé :\n";
echo "- ID: {$user->id}\n";
echo "- Nom: {$user->name}\n";
echo "- Email: {$user->email}\n";
echo "- Rôle: {$user->role}\n";
echo "- Mot de passe: Password123\n";

echo "\n🎯 Prêt pour les tests !\n";
