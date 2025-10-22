<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Vérifie si l'utilisateur connecté a le rôle requis.
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié ❌'], 401);
        }

        // Si aucun rôle n’est passé, on bloque par sécurité
        if (empty($roles)) {
            return response()->json(['message' => 'Aucun rôle spécifié pour cette route ⚠️'], 400);
        }

        // Vérifie si le rôle de l'utilisateur correspond à un des rôles autorisés
        if (!in_array($user->role, $roles)) {
            return response()->json([
                'message' => "Accès refusé 🚫 — rôles requis : " . implode(', ', $roles)
            ], 403);
        }

        return $next($request);
    }
}
