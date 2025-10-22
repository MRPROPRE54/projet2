<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Handle unauthenticated requests for APIs.
     */
    protected function redirectTo($request): ?string
    {
        // ⚠️ Pour les requêtes API, on ne redirige pas vers une route "login"
        if (! $request->expectsJson()) {
            abort(response()->json(['message' => 'Unauthenticated.'], 401));
        }
        return null;
    }
}
