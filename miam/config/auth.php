<?php

return [

    'defaults' => [
        'guard' => 'sanctum',
        'passwords' => 'utilisateurs',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'utilisateurs',
        ],

        'api' => [
            'driver' => 'sanctum',
            'provider' => 'utilisateurs',
        ],
    ],

    'providers' => [
        'utilisateurs' => [
            'driver' => 'eloquent',
            'model' => App\Models\Utilisateur::class, // 👈 ton modèle
        ],
    ],

    'passwords' => [
        'utilisateurs' => [
            'provider' => 'utilisateurs',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,
];
