# 🧪 GUIDE DE TEST MANUEL COMPLET - Postman
## Application MIAM - Système de Restauration Universitaire

### 📋 PRÉREQUIS
- Serveur Laravel démarré : `php artisan serve`
- Postman installé et configuré
- Base URL : `http://localhost:8000/api`
- Base de données PostgreSQL configurée et migrée

### 🎯 FONCTIONNALITÉS TESTÉES
- ✅ Authentification et gestion des utilisateurs
- ✅ Gestion des menus, produits et catégories
- ✅ Système de commandes et paniers
- ✅ **NOUVEAU** : Points de fidélité (1000F = 1 point, 15 points = 1000F réduction)
- ✅ **NOUVEAU** : Système de parrainage avec codes
- ✅ **NOUVEAU** : Gestion des promotions
- ✅ **NOUVEAU** : Gestion des événements avec réservations
- ✅ **NOUVEAU** : Système de réclamations

---

## 🔐 **TEST 1: AUTHENTIFICATION**

### 1.1 Inscription d'un utilisateur
```bash
POST http://localhost:8000/api/register
Content-Type: application/json


```
**✅ Réponse attendue :** 201 - Utilisateur créé avec token

### 1.2 Connexion
```bash
POST http://localhost:8000/api/login
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "Password123"
}
```
**✅ Réponse attendue :** 200 - Token généré

### 1.3 Récupération du profil
```bash
GET http://localhost:8000/api/profile
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :** 200 - Profil utilisateur

### 1.4 Déconnexion
```bash
POST http://localhost:8000/api/logout
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :** 200 - Déconnecté

---

## 📂 **TEST 2: GESTION DES CATÉGORIES**

### 2.1 Lister toutes les catégories
```bash
GET http://localhost:8000/api/categories
```
**✅ Réponse attendue :** 200 - Liste des catégories

### 2.2 Créer une catégorie
```bash
POST http://localhost:8000/api/categories
Content-Type: application/json

{
    "nom_categorie": "test_categorie",
    "description": "Catégorie de test"
}
```
**✅ Réponse attendue :** 201 - Catégorie créée

### 2.3 Récupérer une catégorie spécifique
```bash
GET http://localhost:8000/api/categories/1
```
**✅ Réponse attendue :** 200 - Catégorie trouvée

### 2.4 Modifier une catégorie
```bash
PUT http://localhost:8000/api/categories/1
Content-Type: application/json

{
    "nom_categorie": "catégorie_modifiée",
    "description": "Description modifiée"
}
```
**✅ Réponse attendue :** 200 - Catégorie mise à jour

### 2.5 Supprimer une catégorie
```bash
DELETE http://localhost:8000/api/categories/1
```
**✅ Réponse attendue :** 200 - Catégorie supprimée

---

## 🍽️ **TEST 3: GESTION DES MENUS**

### 3.1 Lister tous les menus
```bash
GET http://localhost:8000/api/menus
```
**✅ Réponse attendue :** 200 - Liste des menus

### 3.2 Créer un menu (nécessite authentification)
```bash
POST http://localhost:8000/api/menus
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
    "nom_plat": "Poulet Braisé",
    "description": "Poulet braisé aux épices",
    "prix": 2500,
    "categorie": "plat",
    "image": "poulet.jpg"
}
```
**✅ Réponse attendue :** 201 - Menu créé

### 3.3 Récupérer un menu spécifique
```bash
GET http://localhost:8000/api/menus/1
```
**✅ Réponse attendue :** 200 - Menu trouvé

### 3.4 Modifier un menu
```bash
PUT http://localhost:8000/api/menus/1
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
    "nom_plat": "Poulet Braisé Modifié",
    "prix": 3000,
    "disponible": true
}
```
**✅ Réponse attendue :** 200 - Menu mis à jour

### 3.5 Supprimer un menu
```bash
DELETE http://localhost:8000/api/menus/1
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :** 200 - Menu supprimé

---

## 🛍️ **TEST 4: GESTION DES PRODUITS**

### 4.1 Lister tous les produits
```bash
GET http://localhost:8000/api/produits
```
**✅ Réponse attendue :** 200 - Liste des produits

### 4.2 Créer un produit
```bash
POST http://localhost:8000/api/produits
Content-Type: application/json

{
    "nom": "Pizza Test Commande",
    "description": "Pizza pour tester le système de commandes",
    "prix": 4500,
    "categorie_id": 2,
    "menu_id": 1
  }
```
**✅ Réponse attendue :** 201 - Produit créé

### 4.3 Récupérer un produit spécifique
```bash
GET http://localhost:8000/api/produits/1
```
**✅ Réponse attendue :** 200 - Produit trouvé

### 4.4 Modifier un produit
```bash
PUT http://localhost:8000/api/produits/1
Content-Type: application/json

{
    "nom": "Coca Cola Modifié",
    "prix": 600,
    "disponible": false
}
```
**✅ Réponse attendue :** 200 - Produit mis à jour

### 4.5 Supprimer un produit
```bash
DELETE http://localhost:8000/api/produits/1
```
**✅ Réponse attendue :** 200 - Produit supprimé

---

## 🛒 **TEST 5: SYSTÈME DE PANIER**

### 5.1 Récupérer le panier de l'utilisateur connecté
```bash
GET http://localhost:8000/api/panier
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :** 200 - Panier récupéré (vide ou avec produits)

### 5.2 Ajouter un produit au panier
```bash
POST http://localhost:8000/api/panier/add
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
    "produit_id": 1,
    "quantite": 2
}
```
**✅ Réponse attendue :** 200 - Produit ajouté au panier

### 5.3 Récupérer le panier (avec produits)
```bash
GET http://localhost:8000/api/panier
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :** 200 - Panier avec produits

### 5.4 Supprimer un produit du panier
```bash
DELETE http://localhost:8000/api/panier/remove/1
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :** 200 - Produit supprimé du panier

### 5.5 Vider complètement le panier
```bash
DELETE http://localhost:8000/api/panier/clear
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :** 200 - Panier vidé

---

## 📋 **TEST 6: SYSTÈME DE COMMANDES**

### 6.1 Lister toutes les commandes
```bash
GET http://localhost:8000/api/commandes
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :** 200 - Liste des commandes

### 6.2 Créer une commande directe
```bash
POST http://localhost:8000/api/commandes
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
    "user_id": 1,
    "type": "sur_place",
    "commentaire": "Sans oignons",
    "produits": [
        {
            "produit_id": 1,
            "quantite": 2
        }
    ]
}
```
**✅ Réponse attendue :** 201 - Commande créée

### 6.3 Créer une commande depuis le panier
```bash
POST http://localhost:8000/api/commandes/from-cart/1
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
    "type": "livraison",
    "adresse_livraison": "Douala, Cameroun",
    "commentaire": "Livraison rapide",
    "heure_souhaitee": "2024-01-15 12:30:00"
}
```
**✅ Réponse attendue :** 201 - Commande créée depuis panier

### 6.4 Récupérer une commande spécifique
```bash
GET http://localhost:8000/api/commandes/1
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :** 200 - Commande trouvée

### 6.5 Mettre à jour le statut d'une commande
```bash
PUT http://localhost:8000/api/commandes/1
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
    "statut": "confirmee"
}
```
**✅ Réponse attendue :** 200 - Statut mis à jour

### 6.6 Supprimer une commande
```bash
DELETE http://localhost:8000/api/commandes/1
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :** 200 - Commande supprimée

---

## 👥 **TEST 7: GESTION DES UTILISATEURS**

### 7.1 Lister tous les utilisateurs
```bash
GET http://localhost:8000/api/utilisateurs
```
**✅ Réponse attendue :** 200 - Liste des utilisateurs

### 7.2 Récupérer un utilisateur spécifique
```bash
GET http://localhost:8000/api/utilisateurs/1
```
**✅ Réponse attendue :** 200 - Utilisateur trouvé

### 7.3 Créer un utilisateur
```bash
POST http://localhost:8000/api/utilisateurs
Content-Type: application/json

{
    "name": "Nouvel Utilisateur",
    "email": "nouveau@example.com",
    "password": "Password123",
    "role": "employe",
    "telephone": "987654321",
    "localisation": "Yaoundé"
}
```
**✅ Réponse attendue :** 201 - Utilisateur créé

### 7.4 Modifier un utilisateur
```bash
PUT http://localhost:8000/api/utilisateurs/1
Content-Type: application/json

{
    "name": "Utilisateur Modifié",
    "telephone": "111111111"
}
```
**✅ Réponse attendue :** 200 - Utilisateur mis à jour

### 7.5 Supprimer un utilisateur
```bash
DELETE http://localhost:8000/api/utilisateurs/1
```
**✅ Réponse attendue :** 200 - Utilisateur supprimé

---

## 🔐 **TEST 8: SYSTÈME DE RÔLES ET PERMISSIONS**

### 8.1 Test accès espace étudiant (avec token étudiant)
```bash
GET http://localhost:8000/api/etudiant/test
Authorization: Bearer [TOKEN_ETUDIANT]
```
**✅ Réponse attendue :** 200 - Accès autorisé

### 8.2 Test accès espace employé (avec token étudiant)
```bash
GET http://localhost:8000/api/employe/test
Authorization: Bearer [TOKEN_ETUDIANT]
```
**✅ Réponse attendue :** 403 - Accès refusé (correct)

### 8.3 Test accès espace gérant (avec token étudiant)
```bash
GET http://localhost:8000/api/gerant/test
Authorization: Bearer [TOKEN_ETUDIANT]
```
**✅ Réponse attendue :** 403 - Accès refusé (correct)

### 8.4 Test accès gestion (admin/gérant seulement)
```bash
GET http://localhost:8000/api/gestion
Authorization: Bearer [TOKEN_ADMIN]
```
**✅ Réponse attendue :** 200 - Accès autorisé

---

## 🧪 **TEST 9: TESTS DE VALIDATION ET ERREURS**

### 9.1 Test inscription avec données invalides
```bash
POST http://localhost:8000/api/register
Content-Type: application/json

{
    "name": "",
    "email": "email-invalide",
    "password": "123"
}
```
**✅ Réponse attendue :** 422 - Erreurs de validation

### 9.2 Test connexion avec mauvais identifiants
```bash
POST http://localhost:8000/api/login
Content-Type: application/json

{
    "email": "inexistant@example.com",
    "password": "mauvais"
}
```
**✅ Réponse attendue :** 401 - Identifiants incorrects

### 9.3 Test accès sans token
```bash
GET http://localhost:8000/api/panier
```
**✅ Réponse attendue :** 401 - Non authentifié

### 9.4 Test accès avec token invalide
```bash
GET http://localhost:8000/api/panier
Authorization: Bearer token_invalide
```
**✅ Réponse attendue :** 401 - Token invalide

--



## 🎯 **NOUVELLES FONCTIONNALITÉS - POINTS DE FIDÉLITÉ**

### **💎 TEST 10: SYSTÈME DE POINTS DE FIDÉLITÉ**

> **📝 RÈGLES DU SYSTÈME :**
> - 1000F dépensé = 1 point gagné
> - 15 points = 1000F de réduction
> - Les points expirent après 1 an

#### 10.1 Récupérer les points d'un utilisateur
```bash
GET http://localhost:8000/api/fidelite/user/1
Authorization: Bearer [VOTRE_TOKEN]
```
**📊 Réponse attendue :**
```json
{
    "user_id": 1,
    "total_points": 25,
    "historique": [
        {
            "id": 1,
            "points_gagnes": 15,
            "points_utilises": 0,
            "source": "commande",
            "description": "Points gagnés pour la commande #1",
            "created_at": "2025-10-19T10:00:00.000000Z"
        }
    ]
}
```

#### 10.2 Ajouter des points manuellement (Test)
```bash
POST http://localhost:8000/api/fidelite/add-points
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
    "user_id": 1,
    "points_gagnes": 10,
    "source": "test_manuel",
    "description": "Points ajoutés manuellement pour test",
    "commande_id": null
}
```
**✅ Réponse attendue :** 201 - Points ajoutés avec succès

#### 10.3 Calculer la réduction possible
```bash
GET http://localhost:8000/api/fidelite/calculate-reduction/1
Authorization: Bearer [VOTRE_TOKEN]
```
**📊 Réponse attendue :**
```json
{
    "points_disponibles": 25,
    "reduction_possible": 1000,
    "points_pour_reduction_complete": 5,
    "regle": "15 points = 1000F de réduction"
}
```

#### 10.4 Utiliser des points pour réduction
```bash
POST http://localhost:8000/api/fidelite/use-for-reduction
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
    "user_id": 1,
    "points_to_use": 15
}
```
**✅ Réponse attendue :**
```json
{
    "message": "Points utilisés avec succès",
    "points_utilises": 15,
    "reduction_obtenue": 1000,
    "points_restants": 10
}
```

#### 10.5 Historique des points
```bash
GET http://localhost:8000/api/fidelite/history/1
Authorization: Bearer [VOTRE_TOKEN]
```
**📊 Réponse attendue :** Liste paginée de l'historique des points

#### 10.6 Calcul automatique après commande
```bash
POST http://localhost:8000/api/fidelite/calculate-from-order/1
Authorization: Bearer [VOTRE_TOKEN]
```
**📊 Réponse attendue :**
```json
{
    "message": "Points calculés et ajoutés",
    "points_gagnes": 5,
    "montant_commande": 5000,
    "regle": "1000F dépensé = 1 point"
}
```

---

## 👥 **TEST 11: SYSTÈME DE PARRAINAGE**

### **🎁 TEST 11: SYSTÈME DE PARRAINAGE**

> **📝 RÈGLES DU SYSTÈME :**
> - Code de parrainage : 8 caractères aléatoires
> - Parrain gagne : 45 points
> - Filleul gagne : 20 points bonus
> - Un code ne peut être utilisé qu'une fois

#### 11.1 Générer un code de parrainage
```bash
POST http://localhost:8000/api/parrainage/generate-code/1
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :**
```json
{
    "message": "Code de parrainage généré avec succès",
    "code": "ABC12345",
    "points_gagnés": 45
}
```

#### 11.2 Vérifier un code de parrainage
```bash
GET http://localhost:8000/api/parrainage/check-code/ABC12345
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :**
```json
{
    "valid": true,
    "message": "Code de parrainage valide",
    "parrain": {
        "id": 1,
        "name": "Test User"
    }
}
```

#### 11.3 Utiliser un code de parrainage
```bash
POST http://localhost:8000/api/parrainage/use-code
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
    "code": "ABC12345",
    "filleul_id": 2
}
```
**✅ Réponse attendue :**
```json
{
    "message": "Code de parrainage utilisé avec succès",
    "parrain_id": 1,
    "filleul_id": 2,
    "points_parrain": 45,
    "points_filleul": 20
}
```

#### 11.4 Récupérer les parrainages d'un utilisateur
```bash
GET http://localhost:8000/api/parrainage/user/1
Authorization: Bearer [VOTRE_TOKEN]
```
**📊 Réponse attendue :**
```json
{
    "parrainages": [
        {
            "id": 1,
            "code_utilise": "ABC12345",
            "filleul": {
                "id": 2,
                "name": "Filleul User"
            }
        }
    ],
    "total_parrainages": 1
}
```

#### 11.5 Historique de parrainage
```bash
GET http://localhost:8000/api/parrainage/history/1
Authorization: Bearer [VOTRE_TOKEN]
```
**📊 Réponse attendue :** Historique complet (en tant que parrain et filleul)

---

## 🎉 **TEST 12: GESTION DES PROMOTIONS**

### **🏷️ TEST 12: GESTION DES PROMOTIONS**

> **📝 FONCTIONNALITÉS :**
> - Promotions en pourcentage ou montant fixe
> - Gestion des dates de validité
> - Activation/désactivation
> - Filtres par statut

#### 12.1 Lister toutes les promotions
```bash
GET http://localhost:8000/api/promotions
```
**📊 Réponse attendue :** Liste des promotions actives

#### 12.2 Créer une promotion (Admin/Gérant)
```bash
POST http://localhost:8000/api/promotions
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
    "nom": "Promotion Étudiants",
    "description": "20% de réduction pour les étudiants",
    "pourcentage_reduction": 20.00,
    "date_debut": "2025-10-19",
    "date_fin": "2025-12-31",
    "actif": true
}
```
**✅ Réponse attendue :** 201 - Promotion créée avec succès

#### 12.3 Récupérer une promotion spécifique
```bash
GET http://localhost:8000/api/promotions/1
```
**📊 Réponse attendue :**
```json
{
    "id": 1,
    "nom": "Promotion Étudiants",
    "pourcentage_reduction": 20.00,
    "date_debut": "2025-10-19",
    "date_fin": "2025-12-31",
    "actif": true
}
```

#### 12.4 Promotions expirées
```bash
GET http://localhost:8000/api/promotions/expired
```
**📊 Réponse attendue :** Liste des promotions expirées

#### 12.5 Promotions à venir
```bash
GET http://localhost:8000/api/promotions/upcoming
```
**📊 Réponse attendue :** Liste des promotions à venir

#### 12.6 Activer/Désactiver une promotion
```bash
POST http://localhost:8000/api/promotions/1/toggle
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :** Promotion activée/désactivée

---

## 🎪 **TEST 13: GESTION DES ÉVÉNEMENTS**

### **🎭 TEST 13: GESTION DES ÉVÉNEMENTS**

> **📝 FONCTIONNALITÉS :**
> - Création d'événements avec lieux, prix, dates
> - Gestion des places limitées
> - Système de réservation/annulation
> - Filtres par statut (à venir, en cours, passés)

#### 13.1 Lister tous les événements
```bash
GET http://localhost:8000/api/evenements
```
**📊 Réponse attendue :** Liste de tous les événements

#### 13.2 Créer un événement
```bash
POST http://localhost:8000/api/evenements
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
    "nom": "Soirée Spéciale",
    "description": "Soirée avec menu spécial et animation",
    "date_debut": "2025-11-15",
    "date_fin": "2025-11-15",
    "heure_debut": "19:00",
    "heure_fin": "23:00",
    "lieu": "Restaurant MIAM",
    "prix": 5000.00,
    "places_limitees": 30,
    "actif": true
}
```
**✅ Réponse attendue :** 201 - Événement créé avec succès

#### 13.3 Événements à venir
```bash
GET http://localhost:8000/api/evenements/a-venir
```
**📊 Réponse attendue :** Liste des événements à venir

#### 13.4 Événements en cours
```bash
GET http://localhost:8000/api/evenements/en-cours
```
**📊 Réponse attendue :** Liste des événements en cours

#### 13.5 Réserver des places
```bash
POST http://localhost:8000/api/evenements/1/reserver
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
    "nombre_places": 2
}
```
**✅ Réponse attendue :**
```json
{
    "message": "Places réservées avec succès",
    "places_reservees": 2,
    "places_restantes": 28
}
```

#### 13.6 Annuler une réservation
```bash
POST http://localhost:8000/api/evenements/1/annuler
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
    "nombre_places": 1
}
```
**✅ Réponse attendue :**
```json
{
    "message": "Réservation annulée avec succès",
    "places_annulees": 1,
    "places_restantes": 29
}
```

---

## 🎯 **ORDRE DE TEST RECOMMANDÉ**

1. **Authentification** (1.1 → 1.2 → 1.3)
2. **Catégories** (2.1 → 2.2 → 2.3 → 2.4 → 2.5)
3. **Menus** (3.1 → 3.2 → 3.3 → 3.4 → 3.5)
4. **Produits** (4.1 → 4.2 → 4.3 → 4.4 → 4.5)
5. **Panier** (5.1 → 5.2 → 5.3 → 5.4 → 5.5)
6. **Commandes** (6.1 → 6.2 → 6.3 → 6.4 → 6.5)
7. **Utilisateurs** (7.1 → 7.2 → 7.3 → 7.4 → 7.5)
8. **Rôles** (8.1 → 8.2 → 8.3 → 8.4)
9. **Tests d'erreurs** (9.1 → 9.2 → 9.3 → 9.4)
10. **🆕 Points de fidélité** (10.1 → 10.2 → 10.3 → 10.4 → 10.5)
11. **🆕 Parrainage** (11.1 → 11.2 → 11.3 → 11.4 → 11.5)
12. **🆕 Promotions** (12.1 → 12.2 → 12.3 → 12.4 → 12.5)
13. **🆕 Événements** (13.1 → 13.2 → 13.3 → 13.4 → 13.5 → 13.6)

---

## 🧪 **TEST 14: VALIDATION DES NOUVELLES FONCTIONNALITÉS**

### **🔍 TEST 14: VALIDATION ET SCÉNARIOS D'ERREUR**

#### 14.1 Test des règles de points de fidélité
```bash
# Test 1: Commande de 15000F → doit donner 15 points
POST http://localhost:8000/api/fidelite/calculate-from-order/1
# Vérifier: 15 points = 1000F de réduction possible

# Test 2: Utiliser 30 points → doit donner 2000F de réduction
POST http://localhost:8000/api/fidelite/use-for-reduction
{
    "user_id": 1,
    "points_to_use": 30
}
# Vérifier: 2000F de réduction obtenue

# Test 3: Utiliser 14 points → doit échouer (pas multiple de 15)
POST http://localhost:8000/api/fidelite/use-for-reduction
{
    "user_id": 1,
    "points_to_use": 14
}
# Vérifier: Erreur "Le nombre de points doit être un multiple de 15"
```

#### 14.2 Test du système de parrainage
```bash
# Test 1: Générer un code pour l'utilisateur 1
POST http://localhost:8000/api/parrainage/generate-code/1
# Vérifier: Code généré (8 caractères)

# Test 2: Utiliser le code avec l'utilisateur 2
POST http://localhost:8000/api/parrainage/use-code
{
    "code": "GENERATED_CODE",
    "filleul_id": 2
}
# Vérifier: 45 points au parrain, 20 au filleul

# Test 3: Réutiliser le même code → doit échouer
POST http://localhost:8000/api/parrainage/use-code
{
    "code": "SAME_CODE",
    "filleul_id": 3
}
# Vérifier: Erreur "Code de parrainage déjà utilisé"

# Test 4: S'parrainer soi-même → doit échouer
POST http://localhost:8000/api/parrainage/use-code
{
    "code": "GENERATED_CODE",
    "filleul_id": 1
}
# Vérifier: Erreur "Vous ne pouvez pas utiliser votre propre code"
```

#### 14.3 Test des promotions
```bash
# Test 1: Créer une promotion sans pourcentage ni montant → doit échouer
POST http://localhost:8000/api/promotions
{
    "nom": "Promotion Test",
    "date_debut": "2025-10-19",
    "date_fin": "2025-12-31"
}
# Vérifier: Erreur "Veuillez spécifier soit un pourcentage soit un montant"

# Test 2: Créer une promotion avec date de fin avant date de début → doit échouer
POST http://localhost:8000/api/promotions
{
    "nom": "Promotion Test",
    "pourcentage_reduction": 20,
    "date_debut": "2025-12-31",
    "date_fin": "2025-10-19"
}
# Vérifier: Erreur de validation des dates
```

#### 14.4 Test des événements
```bash
# Test 1: Réserver plus de places que disponibles → doit échouer
POST http://localhost:8000/api/evenements/1/reserver
{
    "nombre_places": 100
}
# Vérifier: Erreur "Places insuffisantes"

# Test 2: Réserver des places pour un événement passé → doit échouer
# (Créer d'abord un événement avec date passée)
POST http://localhost:8000/api/evenements/1/reserver
{
    "nombre_places": 2
}
# Vérifier: Erreur "Cet événement a déjà commencé"
```

---

## 📊 **RAPPORT DE TEST DÉTAILLÉ**

### **✅ FONCTIONNALITÉS VALIDÉES**

#### **Points de Fidélité**
- [ ] Calcul correct: 1000F = 1 point
- [ ] Réduction correcte: 15 points = 1000F
- [ ] Validation des multiples de 15
- [ ] Historique des points
- [ ] Calcul automatique après commande

#### **Système de Parrainage**
- [ ] Génération de codes uniques (8 caractères)
- [ ] Attribution correcte des points (45 parrain, 20 filleul)
- [ ] Validation: un code = une utilisation
- [ ] Protection contre l'auto-parrainage
- [ ] Historique des parrainages

#### **Promotions**
- [ ] Création avec pourcentage ou montant
- [ ] Validation des dates
- [ ] Activation/désactivation
- [ ] Filtres par statut (actives, expirées, à venir)

#### **Événements**
- [ ] Création avec tous les champs
- [ ] Gestion des places limitées
- [ ] Réservation/annulation
- [ ] Filtres par statut (à venir, en cours, passés)
- [ ] Validation des dates et heures

### **❌ ERREURS DÉTECTÉES**
- [ ] Liste des erreurs trouvées lors des tests
- [ ] Solutions proposées
- [ ] Corrections apportées

---

## 🚨 **POINTS D'ATTENTION**

- **Gardez votre token** après la connexion pour les tests suivants
- **Notez les IDs** des ressources créées pour les tests de modification/suppression
- **Testez les permissions** avec différents rôles d'utilisateurs
- **Vérifiez les codes de statut** HTTP (200, 201, 401, 403, 422, etc.)
- **🆕 Points de fidélité** : Respectez les règles 1000F=1pt et 15pts=1000F
- **🆕 Parrainage** : Un code ne peut être utilisé qu'une fois
- **🆕 Promotions** : Au moins un type de réduction requis
- **🆕 Événements** : Vérifiez les places disponibles avant réservation
- **🆕 Réclamations** : Une seule réclamation par commande, vérifiez les statuts

---

## 🎯 **RÉSUMÉ DES NOUVELLES FONCTIONNALITÉS**

### **💎 Points de Fidélité**
- **Règle** : 1000F dépensé = 1 point, 15 points = 1000F de réduction
- **Routes** : `/api/fidelite/*`
- **Fonctionnalités** : Calcul automatique, utilisation, historique

### **👥 Parrainage**
- **Règle** : Code 8 caractères, 45 points parrain, 20 points filleul
- **Routes** : `/api/parrainage/*`
- **Fonctionnalités** : Génération, utilisation, historique

### **🎉 Promotions**
- **Types** : Pourcentage ou montant fixe
- **Routes** : `/api/promotions/*`
- **Fonctionnalités** : CRUD, activation, filtres

### **🎪 Événements**
- **Gestion** : Places limitées, réservations
- **Routes** : `/api/evenements/*`
- **Fonctionnalités** : CRUD, réservation, filtres


### **📝 Réclamations**
- **Gestion** : Une réclamation par commande, statuts multiples
- **Routes** : `/api/reclamations/*` et `/api/admin/reclamations/*`
- **Fonctionnalités** : CRUD utilisateur, traitement admin, recherche

---

## 📝 **TEST 7: SYSTÈME DE RÉCLAMATIONS**

### 7.1 Créer une réclamation
```bash
POST http://localhost:8000/api/reclamations
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
    "commande_id": 1,
    "sujet": "Commande en retard",
    "description": "Ma commande devait arriver à 12h mais elle n'est toujours pas là à 14h"
}
```
**✅ Réponse attendue :** 201 - Réclamation créée avec statut "en_attente"

### 7.2 Récupérer mes réclamations
```bash
GET http://localhost:8000/api/reclamations
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :** 200 - Liste des réclamations de l'utilisateur

### 7.3 Voir une réclamation spécifique
```bash
GET http://localhost:8000/api/reclamations/1
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :** 200 - Détails de la réclamation

### 7.4 Modifier une réclamation (si en attente)
```bash
PUT http://localhost:8000/api/reclamations/1
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
    "sujet": "Nouveau sujet",
    "description": "Nouvelle description plus détaillée"
}
```
**✅ Réponse attendue :** 200 - Réclamation mise à jour

### 7.5 Annuler une réclamation
```bash
POST http://localhost:8000/api/reclamations/1/cancel
Authorization: Bearer [VOTRE_TOKEN]
```
**✅ Réponse attendue :** 200 - Réclamation annulée

### 7.6 Récupérer toutes les réclamations (Admin)
```bash
GET http://localhost:8000/api/admin/reclamations
Authorization: Bearer [TOKEN_ADMIN]
```
**✅ Réponse attendue :** 200 - Toutes les réclamations

### 7.7 Filtrer les réclamations par statut (Admin)
```bash
GET http://localhost:8000/api/admin/reclamations?statut=en_attente
Authorization: Bearer [TOKEN_ADMIN]
```
**✅ Réponse attendue :** 200 - Réclamations en attente uniquement

### 7.8 Filtrer par utilisateur (Admin)
```bash
GET http://localhost:8000/api/admin/reclamations?user_id=1
Authorization: Bearer [TOKEN_ADMIN]
```
**✅ Réponse attendue :** 200 - Réclamations de l'utilisateur 1

### 7.9 Filtrer par date (Admin)
```bash
GET http://localhost:8000/api/admin/reclamations?date_debut=2024-01-01&date_fin=2024-12-31
Authorization: Bearer [TOKEN_ADMIN]
```
**✅ Réponse attendue :** 200 - Réclamations de l'année 2024

### 7.10 Traiter une réclamation (Admin)
```bash
POST http://localhost:8000/api/admin/reclamations/1/process
Authorization: Bearer [TOKEN_ADMIN]
Content-Type: application/json

{
    "statut": "resolue",
    "reponse": "Nous avons contacté le livreur et votre commande arrive dans 30 minutes. Veuillez nous excuser pour ce retard."
}
```
**✅ Réponse attendue :** 200 - Réclamation traitée avec réponse

### 7.11 Obtenir les statistiques (Admin)
```bash
GET http://localhost:8000/api/admin/reclamations/stats
Authorization: Bearer [TOKEN_ADMIN]
```
**✅ Réponse attendue :** 200 - Statistiques complètes des réclamations

### 7.12 Rechercher des réclamations (Admin)
```bash
GET http://localhost:8000/api/admin/reclamations/search?query=retard&type=sujet
Authorization: Bearer [TOKEN_ADMIN]
```
**✅ Réponse attendue :** 200 - Réclamations contenant "retard" dans le sujet

### 7.13 Recherche globale (Admin)
```bash
GET http://localhost:8000/api/admin/reclamations/search?query=test@example.com&type=user_email
Authorization: Bearer [TOKEN_ADMIN]
```
**✅ Réponse attendue :** 200 - Réclamations de l'utilisateur avec cet email

---

## 🧪 **TESTS DE VALIDATION - RÉCLAMATIONS**

### **✅ Tests de Validation**
- [ ] Création avec données valides
- [ ] Création avec données manquantes (erreur 422)
- [ ] Création avec commande inexistante (erreur 404)
- [ ] Création avec commande d'un autre utilisateur (erreur 404)
- [ ] Tentative de double réclamation pour même commande (erreur 400)
- [ ] Modification de réclamation déjà traitée (erreur 400)
- [ ] Accès sans authentification (erreur 401)

### **✅ Tests de Règles Métier**
- [ ] Un utilisateur = une réclamation par commande maximum
- [ ] Seules les réclamations "en_attente" peuvent être modifiées
- [ ] Vérification que la commande appartient à l'utilisateur
- [ ] Statuts valides : en_attente, en_cours, resolue, rejetee, annulee
- [ ] Traçabilité avec qui a traité la réclamation et quand

### **✅ Tests d'Administration**
- [ ] Accès aux statistiques complètes
- [ ] Recherche par sujet, description, email utilisateur
- [ ] Filtres par statut, utilisateur, dates
- [ ] Traitement avec réponse obligatoire
- [ ] Historique des traitements

### **❌ Erreurs à Tester**
- [ ] Tentative de création sans commande valide
- [ ] Modification de réclamation d'un autre utilisateur
- [ ] Traitement sans réponse
- [ ] Recherche avec terme trop court (< 2 caractères)
- [ ] Accès admin sans permissions

---

## 🚨 **POINTS D'ATTENTION - RÉCLAMATIONS**

- **🆕 Réclamations** : Une seule réclamation par commande par utilisateur
- **🆕 Statuts** : Seules les réclamations "en_attente" sont modifiables
- **🆕 Traitement** : Les admins doivent fournir une réponse lors du traitement
- **🆕 Recherche** : Terme de recherche minimum 2 caractères
- **🆕 Filtres** : Combinaison possible de plusieurs filtres admin

Bon test ! 🚀

