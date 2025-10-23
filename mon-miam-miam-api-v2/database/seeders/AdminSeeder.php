<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Administrateur;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\AdminSeeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //1. Création de l'utilisateur Admin dans la table 'users'
         $userAdmin = User::create([
            'nom' => 'Super Administrateur',
            'email' => 'admin@monmiam.com', // E-mail pour la connexion de test
            'password' => Hash::make('12345678'), // MOT DE PASSE : 12345678 (très facile à retenir pour le développement)
            'telephone' => '0000000000',
            'localisation' => 'UCAC-ICAM',
            'statut_compte' => 'actif',
            'type_utilisateur' => 'Administrateur', // Rôle selon le MCD
        ]);
        // 2. Création de l'entrée dans la table 'administrateurs' (selon votre MCD)
        Administrateur::create([
            'user_id' => $userAdmin->id,
            'droits_admin' => json_encode(['full_access' => true]),
            // $this->call(AdminSeeder::class);
            $this->call([
        AdminSeeder::class, // Assurez-vous que cette ligne est présente
        ]);
]);
    }
}

    

