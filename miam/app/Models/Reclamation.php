<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reclamation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'commande_id',
        'sujet',
        'description',
        'statut',
        'reponse',
        'traite_par',
        'date_traitement',
    ];

    protected $casts = [
        'date_traitement' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    public function traitePar()
    {
        return $this->belongsTo(User::class, 'traite_par');
    }
}

