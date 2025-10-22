<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PointFidelite extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'points_gagnes',
        'points_utilises',
        'source',
        'commande_id',
        'description',
        'date_expiration',
    ];

    protected $casts = [
        'date_expiration' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }
}