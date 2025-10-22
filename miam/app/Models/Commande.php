<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'montant_total', 
        'statut',
        'type',
        'commentaire',
        'adresse_livraison',
        'heure_souhaitee'
    ];

    protected $casts = [
        'montant_total' => 'decimal:2',
        'heure_souhaitee' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ligneCommandes()
    {
        return $this->hasMany(LigneCommande::class);
    }

    public function produits()
    {
        return $this->belongsToMany(Product::class, 'ligne_commandes')
                    ->withPivot('quantite', 'prix_unitaire', 'sous_total')
                    ->withTimestamps();
    }
}