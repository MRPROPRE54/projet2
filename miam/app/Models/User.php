<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'telephone',
        'localisation',
        'role',
        'statut_compte',
        'points_fidelite',
        'code_parrainage',
        'id_parrain',
        'poste',
        'date_embauche',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'date_embauche' => 'date',
    ];

    // Relations
    public function parrain()
    {
        return $this->belongsTo(User::class, 'id_parrain');
    }

    public function filleuls()
    {
        return $this->hasMany(User::class, 'id_parrain');
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class);
    }

    public function reclamations()
    {
        return $this->hasMany(Reclamation::class);
    }

    public function pointsFidelite()
    {
        return $this->hasMany(PointFidelite::class);
    }

    public function parrainages()
    {
        return $this->hasMany(Parrainage::class, 'id_parrain');
    }

    // Méthodes utilitaires
    public function isEtudiant()
    {
        return $this->role === 'etudiant';
    }

    public function isEmploye()
    {
        return $this->role === 'employe';
    }

    public function isGerant()
    {
        return $this->role === 'gerant';
    }

    public function isAdministrateur()
    {
        return $this->role === 'administrateur';
    }

    public function generateCodeParrainage()
    {
        if (!$this->code_parrainage) {
            $this->code_parrainage = 'REF' . strtoupper(substr($this->name, 0, 3)) . $this->id;
            $this->save();
        }
        return $this->code_parrainage;
    }

    public function addPointsFidelite($points, $source = 'commande', $commandeId = null, $description = null)
    {
        $this->points_fidelite += $points;
        $this->save();

        // Créer un enregistrement dans point_fidelites
        PointFidelite::create([
            'user_id' => $this->id,
            'points_gagnes' => $points,
            'source' => $source,
            'commande_id' => $commandeId,
            'description' => $description,
            'date_expiration' => now()->addYear(),
        ]);
    }

    public function utiliserPointsFidelite($points)
    {
        if ($this->points_fidelite >= $points) {
            $this->points_fidelite -= $points;
            $this->save();

            PointFidelite::create([
                'user_id' => $this->id,
                'points_utilises' => $points,
                'source' => 'utilisation',
                'description' => 'Points utilisés pour paiement',
            ]);

            return true;
        }
        return false;
    }
}
