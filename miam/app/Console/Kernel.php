<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Les commandes Artisan fournies par ton application.
     */
    protected $commands = [
        \App\Console\Commands\TestKernel::class, // ✅ ajoute ici ta commande de test
    ];

    /**
     * Définit les tâches planifiées.
     */
    protected function schedule(Schedule $schedule): void
    {
        // exemple : $schedule->command('inspire')->hourly();
    }

    /**
     * Enregistre les commandes et fichiers de console.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
