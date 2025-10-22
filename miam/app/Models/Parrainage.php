<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parrainage extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_parrain',
        'id_filleul',
        'code_utilise',
        'recompense_attribuee',
        'points_parrainage',
    ];

    protected $casts = [
        'recompense_attribuee' => 'boolean',
    ];

    public function parrain()
    {
        return $this->belongsTo(User::class, 'id_parrain');
    }

    public function filleul()
    {
        return $this->belongsTo(User::class, 'id_filleul');
    }
}