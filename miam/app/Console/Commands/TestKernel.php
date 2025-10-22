<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Contracts\Http\Kernel as HttpKernel;

class TestKernel extends Command
{
    protected $signature = 'test:kernel';
    protected $description = 'Test si le middleware role est bien enregistré';

    public function handle(HttpKernel $kernel)
    {
        $ref = new \ReflectionClass($kernel);
        $props = $ref->getDefaultProperties();

        if (isset($props['routeMiddleware']['role'])) {
            $this->info("✅ Middleware 'role' est bien enregistré : " . $props['routeMiddleware']['role']);
        } else {
            $this->error("❌ Middleware 'role' introuvable dans le Kernel actif !");
        }
    }
}
