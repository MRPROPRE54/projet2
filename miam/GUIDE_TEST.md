# 🧪 Guide de Test Complet - Mon Miam Miam API

## 📋 Prérequis
- Serveur Laravel démarré (`php artisan serve`)
- Base de données configurée et migrée
- Token d'authentification

## 🔧 Configuration des Tests

### 1. Démarrer le serveur
```bash
php artisan serve
```

### 2. Migrer la base de données
```bash
php artisan migrate:fresh
```

### 3. Exécuter le script de test automatique
```bash
php test_api.php
```

## 🧪 Tests Manuels avec Postman/curl

### 🔐 1. Authentification

#### Inscription
```bash
POST http://localhost:8000/api/register
Content-Type: application/json

{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Password123",
    "password_confirmation": "Password123",
    "telephone": "123456789",
    "localisation": "Douala",
    "role": "etudiant"
}
```

#### Connexion
```bash
POST http://localhost:8000/api/login
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "Password123"
}
```

**Réponse attendue :**
```json
{
    "message": "Connexion réussie ✅",
    "user": {...},
    "token": "1|abc123..."
}
```

### 📂 2. Test des Catégories

#### Lister les catégories
```bash
GET http://localhost:8000/api/categories
```

#### Créer une catégorie
```bash
POST http://localhost:8000/api/categories
Content-Type: application/json

{
    "nom_categorie": "test",
    "description": "Catégorie de test"
}
```

### 🍽️ 3. Test des Menus

#### Lister les menus
```bash
GET http://localhost:8000/api/menus
```

#### Créer un menu (nécessite authentification)
```bash
POST http://localhost:8000/api/menus
Authorization: Bearer 1|abc123...
Content-Type: application/json

{
    "nom_plat": "Poulet Braisé",
    "description": "Poulet braisé aux épices",
    "prix": 2500,
    "categorie": "plat",
    "image": "poulet.jpg"
}
```

### 🛍️ 4. Test des Produits

#### Lister les produits
```bash
GET http://localhost:8000/api/produits
```

#### Créer un produit
```bash
POST http://localhost:8000/api/produits
Content-Type: application/json

{
    "nom": "Coca Cola",
    "description": "Boisson gazeuse",
    "prix": 500,
    "menu_id": 1,
    "categorie_id": 4,
    "disponible": true
}
```

### 🛒 5. Test du Panier

#### Récupérer le panier
```bash
GET http://localhost:8000/api/panier
Authorization: Bearer 1|abc123...
```

#### Ajouter un produit au panier
```bash
POST http://localhost:8000/api/panier/add
Authorization: Bearer 1|abc123...
Content-Type: application/json

{
    "produit_id": 1,
    "quantite": 2
}
```

#### Supprimer un produit du panier
```bash
DELETE http://localhost:8000/api/panier/remove/1
Authorization: Bearer 1|abc123...
```

#### Vider le panier
```bash
DELETE http://localhost:8000/api/panier/clear
Authorization: Bearer 1|abc123...
```

### 📋 6. Test des Commandes

#### Lister les commandes
```bash
GET http://localhost:8000/api/commandes
Authorization: Bearer 1|abc123...
```

#### Créer une commande depuis le panier
```bash
POST http://localhost:8000/api/commandes/from-cart/1
Authorization: Bearer 1|abc123...
Content-Type: application/json

{
    "type": "sur_place",
    "commentaire": "Sans oignons",
    "heure_souhaitee": "2024-01-15 12:30:00"
}
```

#### Créer une commande directe
```bash
POST http://localhost:8000/api/commandes
Authorization: Bearer 1|abc123...
Content-Type: application/json

{
    "user_id": 1,
    "type": "livraison",
    "adresse_livraison": "Douala, Cameroun",
    "commentaire": "Livraison rapide",
    "produits": [
        {
            "produit_id": 1,
            "quantite": 2
        }
    ]
}
```

#### Mettre à jour le statut d'une commande
```bash
PUT http://localhost:8000/api/commandes/1
Authorization: Bearer 1|abc123...
Content-Type: application/json

{
    "statut": "confirmee"
}
```

## 🔍 Vérifications Importantes

### ✅ Points à vérifier :
1. **Authentification** : Token généré et valide
2. **Relations** : Les produits sont liés aux menus et catégories
3. **Panier** : Ajout/suppression fonctionne
4. **Commandes** : Création depuis panier et directe
5. **Permissions** : Seuls les gérants peuvent créer des menus
6. **Validation** : Erreurs appropriées pour données invalides

### ❌ Erreurs courantes :
- **401 Unauthorized** : Token manquant ou invalide
- **404 Not Found** : Route incorrecte
- **422 Validation Error** : Données manquantes
- **500 Server Error** : Problème de base de données

## 🚀 Tests de Performance

### Test de charge simple
```bash
# Test avec curl en boucle
for i in {1..10}; do
  curl -X GET "http://localhost:8000/api/menus" \
    -H "Accept: application/json"
done
```

## 📊 Résultats Attendus

Après tous les tests, vous devriez avoir :
- ✅ Utilisateur créé et connecté
- ✅ Catégories fonctionnelles
- ✅ Menus créés et listés
- ✅ Produits associés aux menus
- ✅ Panier fonctionnel
- ✅ Commandes créées depuis le panier
- ✅ Système de permissions opérationnel

## 🔧 Dépannage

### Problème de base de données
```bash
php artisan migrate:fresh
php artisan db:seed
```

### Problème de cache
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

### Problème de permissions
Vérifiez que les utilisateurs ont les bons rôles dans la base de données.
