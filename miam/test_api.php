<?php

/**
 * Script de test complet pour l'API Mon Miam Miam
 * 
 * Ce script teste toutes les fonctionnalités principales :
 * - Authentification
 * - Gestion des catégories
 * - Gestion des menus
 * - Gestion des produits
 * - Gestion des paniers
 * - Gestion des commandes
 */

class MonMiamMiamTester
{
    private $baseUrl;
    private $token;
    private $userId;

    public function __construct($baseUrl = 'http://localhost:8000/api')
    {
        $this->baseUrl = $baseUrl;
    }

    /**
     * Effectue une requête HTTP
     */
    private function makeRequest($method, $endpoint, $data = null, $headers = [])
    {
        $url = $this->baseUrl . $endpoint;
        
        $defaultHeaders = [
            'Content-Type: application/json',
            'Accept: application/json'
        ];
        
        if ($this->token) {
            $defaultHeaders[] = 'Authorization: Bearer ' . $this->token;
        }
        
        $headers = array_merge($defaultHeaders, $headers);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
        if ($method === 'POST' || $method === 'PUT') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
            if ($data) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            }
        } elseif ($method === 'DELETE') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
        }
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        return [
            'status' => $httpCode,
            'data' => json_decode($response, true)
        ];
    }

    /**
     * Teste l'authentification
     */
    public function testAuth()
    {
        echo "🔐 Test d'authentification...\n";
        
        // Test d'inscription
        $registerData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Password123',
            'password_confirmation' => 'Password123',
            'telephone' => '123456789',
            'localisation' => 'Douala',
            'role' => 'etudiant'
        ];
        
        $response = $this->makeRequest('POST', '/register', $registerData);
        
        if ($response['status'] === 201 || $response['status'] === 422) {
            echo "✅ Inscription testée (peut déjà exister)\n";
        } else {
            echo "❌ Erreur inscription: " . json_encode($response) . "\n";
        }
        
        // Test de connexion
        $loginData = [
            'email' => 'test@example.com',
            'password' => 'Password123'
        ];
        
        $response = $this->makeRequest('POST', '/login', $loginData);
        
        if ($response['status'] === 200 && isset($response['data']['token'])) {
            $this->token = $response['data']['token'];
            $this->userId = $response['data']['user']['id'];
            echo "✅ Connexion réussie - Token: " . substr($this->token, 0, 20) . "...\n";
            return true;
        } else {
            echo "❌ Erreur connexion: " . json_encode($response) . "\n";
            return false;
        }
    }

    /**
     * Teste les catégories
     */
    public function testCategories()
    {
        echo "\n📂 Test des catégories...\n";
        
        // Lister les catégories
        $response = $this->makeRequest('GET', '/categories');
        if ($response['status'] === 200) {
            echo "✅ Liste des catégories récupérée\n";
        } else {
            echo "❌ Erreur liste catégories: " . json_encode($response) . "\n";
        }
    }

    /**
     * Teste les menus
     */
    public function testMenus()
    {
        echo "\n🍽️ Test des menus...\n";
        
        // Lister les menus
        $response = $this->makeRequest('GET', '/menus');
        if ($response['status'] === 200) {
            echo "✅ Liste des menus récupérée\n";
        } else {
            echo "❌ Erreur liste menus: " . json_encode($response) . "\n";
        }
    }

    /**
     * Teste les produits
     */
    public function testProducts()
    {
        echo "\n🛍️ Test des produits...\n";
        
        // Lister les produits
        $response = $this->makeRequest('GET', '/produits');
        if ($response['status'] === 200) {
            echo "✅ Liste des produits récupérée\n";
        } else {
            echo "❌ Erreur liste produits: " . json_encode($response) . "\n";
        }
    }

    /**
     * Teste les paniers
     */
    public function testPanier()
    {
        echo "\n🛒 Test du panier...\n";
        
        // Récupérer le panier
        $response = $this->makeRequest('GET', '/panier');
        if ($response['status'] === 200) {
            echo "✅ Panier récupéré\n";
        } else {
            echo "❌ Erreur panier: " . json_encode($response) . "\n";
        }
    }

    /**
     * Teste les commandes
     */
    public function testCommandes()
    {
        echo "\n📋 Test des commandes...\n";
        
        // Lister les commandes
        $response = $this->makeRequest('GET', '/commandes');
        if ($response['status'] === 200) {
            echo "✅ Liste des commandes récupérée\n";
        } else {
            echo "❌ Erreur liste commandes: " . json_encode($response) . "\n";
        }
    }

    /**
     * Lance tous les tests
     */
    public function runAllTests()
    {
        echo "🚀 Démarrage des tests Mon Miam Miam\n";
        echo "=====================================\n";
        
        if ($this->testAuth()) {
            $this->testCategories();
            $this->testMenus();
            $this->testProducts();
            $this->testPanier();
            $this->testCommandes();
        }
        
        echo "\n✅ Tests terminés !\n";
    }
}

// Utilisation
if (php_sapi_name() === 'cli') {
    $tester = new MonMiamMiamTester();
    $tester->runAllTests();
}
