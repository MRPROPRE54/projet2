# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Mon Miam Miam 
Application web de commande de restaurant pour ZeDuc@Space - UCAC-ICAM 

## Cahier des charges
Projet développé selon le cahier des charges  pour le restaurant "Mon Miam Miam" situé à la Résidence La Terrasse, Yansoki.

## 🚀 Démarrage rapide

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation
1. **Cloner le projet** (si depuis Git) ou naviguer dans le dossier du projet
2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
   - L'application s'ouvrira automatiquement à `http://localhost:3000`
   - Si non, ouvrez manuellement cette URL dans votre navigateur

## Comptes de démonstration

### Étudiant
- Email: `jean.dupont@ucac-icam.com`
- Mot de passe: `Pass123`

### Employé
- Email: `paul.nkosi@zeduc.com`
- Mot de passe: `Admin123`

### Gérant
- Email: `sophie.mbida@zeduc.com`
- Mot de passe: `Manager123`

### Administrateur
- Email: `admin@zeduc.com`
- Mot de passe: `Admin123`

## Charte graphique

- **Couleur primaire**: #cfbd97 (Doré)
- **Couleur secondaire**: #000000 (Noir)

## Technologies utilisées

- **Frontend**: React 19.1.1 + JSX
- **Styles**: Bootstrap 5 + CSS personnalisé
- **Icons**: Lucide React
- **Build tool**: Vite
- **Language**: JavaScript (ES6+)

## 📱 Fonctionnalités principales

### Espace Étudiant
- Commande en ligne avec panier
- Programme de fidélité (1000F = 1 point, 15 points = 1000F)
- Système de parrainage avec codes uniques
- Historique des commandes
- Dépôt de réclamations
- Accès au Top 10 clients
- Mini-jeux

### Espace Employé
- Validation des commandes
- Mise à jour du menu (disponibilité)
- Gestion des réclamations
- Statistiques hebdomadaires

### Espace Gérant
- Supervision des commandes en temps réel
- Création de comptes employés
- Statistiques globales
- Gestion des réclamations

### Espace Administrateur
- Gestion complète des utilisateurs
- CRUD du menu
- Création de promotions et événements
- Paramètres de l'application
- Statistiques détaillées

## Système de tarification
- **Gamelle**: 200F par plat
- **Livraison**: 100F 
- **Points de fidélité**: Calculés automatiquement

## Modes de paiement (simulés)
- Espèces à la livraison
- Mobile Money
- CinePay (Carte bancaire)

## Structure du projet
```
mon-miam-miam/
├── components/         # Composants réutilisables
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── CookieConsent.jsx
├── pages/              # Pages de l'application
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── MenuPage.jsx
│   ├── CartPage.jsx
│   ├── StudentDashboard.jsx
│   ├── EmployeeDashboard.jsx
│   ├── ManagerDashboard.jsx
|   ├──CookiePolicy.jsx
|   ├──PrivacyPolicy.jsx
│   └── AdminDashboard.jsx
├── data/              # Données simulées
│   └── mockData.js
├── utils/             # Utilitaires
│   └── auth.js
├── styles/            # Styles CSS
│   └── globals.css
└── App.jsx            # Composant principal

```

## Scripts disponibles
- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile pour la production
- `npm run preview` - Prévisualise la version de production

## Notes importantes
- Les données sont **simulées localement** (pas de vraie base de données)
- Les paiements sont **simulés** (pas de vraie intégration CinetPay)
- L'authentification utilise **localStorage** (pas de vraie sécurité backend)
- Cette application est un **prototype fonctionnel** pour démonstration

## Développement
Projet développé pour les étudiants de 2ème année del'institut UCAC-ICAM de Yansoki, Cameroun.

### Équipe
- 6 personnes par groupe
- Durée: 3 semaines 
- Méthodologie: Agile (Scrum)

## Licence
Projet académique - UCAC-ICAM © 2024

## Support
Pour toute question ou problème:
1. Vérifier que Node.js est installé: `node --version`
2. Vérifier que les dépendances sont installées: `npm install`
3. Consulter la console du navigateur (F12) pour les erreurs
4. Vider le cache du navigateur si nécessaire

---

