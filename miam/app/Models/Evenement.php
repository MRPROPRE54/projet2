<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Evenement extends Model
{
    protected $fillable = [
        'nom',
        'description',
        'date_debut',
        'date_fin',
        'heure_debut',
        'heure_fin',
        'lieu',
        'prix',
        'places_limitees',
        'places_reservees',
        'actif',
        'image',
        'details_supplementaires'
    ];

    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
        'heure_debut' => 'datetime:H:i',
        'heure_fin' => 'datetime:H:i',
        'prix' => 'decimal:2',
        'actif' => 'boolean',
        'details_supplementaires' => 'array'
    ];

    /**
     * Scope pour les événements actifs
     */
    public function scopeActifs($query)
    {
        return $query->where('actif', true);
    }

    /**
     * Scope pour les événements à venir
     */
    public function scopeAVenir($query)
    {
        return $query->where('date_debut', '>', now());
    }

    /**
     * Scope pour les événements en cours
     */
    public function scopeEnCours($query)
    {
        return $query->where('date_debut', '<=', now())
                    ->where('date_fin', '>=', now());
    }

    /**
     * Scope pour les événements passés
     */
    public function scopePasses($query)
    {
        return $query->where('date_fin', '<', now());
    }

    /**
     * Vérifier si l'événement est complet
     */
    public function isComplet()
    {
        if (!$this->places_limitees) {
            return false;
        }
        
        return $this->places_reservees >= $this->places_limitees;
    }

    /**
     * Vérifier si l'événement est gratuit
     */
    public function isGratuit()
    {
        return is_null($this->prix) || $this->prix == 0;
    }

    /**
     * Obtenir le statut de l'événement
     */
    public function getStatutAttribute()
    {
        $now = now();
        
        if ($this->date_fin < $now) {
            return 'passé';
        } elseif ($this->date_debut > $now) {
            return 'à venir';
        } else {
            return 'en cours';
        }
    }

    /**
     * Obtenir le nombre de places disponibles
     */
    public function getPlacesDisponiblesAttribute()
    {
        if (!$this->places_limitees) {
            return null; // Places illimitées
        }
        
        return max(0, $this->places_limitees - $this->places_reservees);
    }
}