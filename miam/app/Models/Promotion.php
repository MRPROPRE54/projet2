<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
        'pourcentage_reduction',
        'montant_reduction',
        'date_debut',
        'date_fin',
        'actif',
        'image',
    ];

    protected $casts = [
        'pourcentage_reduction' => 'decimal:2',
        'montant_reduction' => 'decimal:2',
        'date_debut' => 'date',
        'date_fin' => 'date',
        'actif' => 'boolean',
    ];

    public function scopeActives($query)
    {
        return $query->where('actif', true)
                    ->where('date_debut', '<=', now())
                    ->where('date_fin', '>=', now());
    }
}