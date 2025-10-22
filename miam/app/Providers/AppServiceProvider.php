<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // 🔹 Utiliser le schéma en minuscules (mm)
        if (config('database.default') === 'pgsql') {
            try {
                DB::statement('SET search_path TO mm, public');
            } catch (\Exception $e) {
                // Évite les erreurs pendant les commandes artisan
            }
        }
    }
}
