<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categorie';
    protected $primaryKey = 'id_categorie';

    protected $fillable = [
        'nom_categorie',
        'description',
    ];

    public function produits()
    {
        return $this->hasMany(Product::class, 'categorie_id');
    }
}
