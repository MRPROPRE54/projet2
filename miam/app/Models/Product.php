<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'produits';
    
    protected $fillable = [
        'nom',
        'description', 
        'prix',
        'menu_id',
        'categorie_id',
        'disponible',
    ];

    protected $casts = [
        'prix' => 'decimal:2',
        'disponible' => 'boolean',
    ];

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id');
    }

    public function categorie()
    {
        return $this->belongsTo(Category::class, 'categorie_id');
    }

    public function lignePaniers()
    {
        return $this->hasMany(LignePanier::class, 'produit_id');
    }

    public function ligneCommandes()
    {
        return $this->hasMany(LigneCommande::class, 'produit_id');
    }
}