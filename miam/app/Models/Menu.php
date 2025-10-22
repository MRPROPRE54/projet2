<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $table = 'menu';
    protected $primaryKey = 'id_menu';

    protected $fillable = [
        'nom_plat',
        'description',
        'prix',
        'categorie', 
        'image',
        'id_gerant',
        'disponible',
        'date_ajout'
    ];

    protected $casts = [
        'prix' => 'decimal:2',
        'disponible' => 'boolean',
        'date_ajout' => 'datetime',
    ];

    // Relations
    public function gerant()
    {
        return $this->belongsTo(User::class, 'id_gerant');
    }

    public function produits()
    {
        return $this->hasMany(Product::class, 'menu_id');
    }
}