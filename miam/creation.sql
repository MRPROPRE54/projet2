-- ==========================================
-- Base de données : MM
-- Auteur : Pharel
-- ==========================================

-- 💣 Supprimer puis recréer le schéma
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
SET search_path TO public;

-- ==========================================
-- TYPES ENUMS
-- ==========================================
CREATE TYPE t_type_utilisateur AS ENUM ('etudiant', 'employe', 'gerant', 'administrateur');
CREATE TYPE t_statut_compte AS ENUM ('actif', 'inactif', 'suspendu');
CREATE TYPE t_methode_paiement AS ENUM ('carte', 'mobile_money', 'points');
CREATE TYPE t_statut_paiement AS ENUM ('en_attente', 'effectue', 'annule');
CREATE TYPE t_statut_reclamation AS ENUM ('ouverte', 'en_cours', 'resolue', 'fermee');

-- ==========================================
-- TABLE UTILISATEUR
-- ==========================================
CREATE TABLE utilisateur (
    id_utilisateur SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mot_de_passe_hash VARCHAR(255) NOT NULL,
    telephone VARCHAR(30),
    localisation VARCHAR(150),
    date_inscription TIMESTAMP DEFAULT now(),
    statut_compte t_statut_compte DEFAULT 'actif',
    type_utilisateur t_type_utilisateur NOT NULL
);

-- ==========================================
-- TABLE ETUDIANT
-- ==========================================
CREATE TABLE etudiant (
    id_etudiant INT PRIMARY KEY REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
    points_fidelite INT DEFAULT 0,
    code_parrainage VARCHAR(50) UNIQUE,
    id_parrain INT REFERENCES etudiant(id_etudiant) ON DELETE SET NULL
);

-- ==========================================
-- TABLE EMPLOYE
-- ==========================================
CREATE TABLE employe (
    id_employe INT PRIMARY KEY REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
    poste VARCHAR(100),
    date_embauche DATE DEFAULT CURRENT_DATE
);

-- ==========================================
-- TABLE GERANT
-- ==========================================
CREATE TABLE gerant (
    id_gerant INT PRIMARY KEY REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
    niveau_acces VARCHAR(50)
);

-- ==========================================
-- TABLE ADMINISTRATEUR
-- ==========================================
CREATE TABLE administrateur (
    id_admin INT PRIMARY KEY REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
    droits_complets BOOLEAN DEFAULT TRUE
);

-- ==========================================
-- TABLE MENU
-- ==========================================
CREATE TABLE menu (
    id_menu SERIAL PRIMARY KEY,
    nom_plat VARCHAR(100) NOT NULL,
    description TEXT,
    prix NUMERIC(8,2) NOT NULL,
    categorie VARCHAR(100),
    image VARCHAR(255),
    disponible BOOLEAN DEFAULT TRUE,
    date_ajout TIMESTAMP DEFAULT now(),
    id_gerant INT REFERENCES gerant(id_gerant) ON DELETE SET NULL
);

-- ==========================================
-- TABLE PROMOTION
-- ==========================================
CREATE TABLE promotion (
    id_promotion SERIAL PRIMARY KEY,
    titre VARCHAR(150),
    description TEXT,
    image VARCHAR(255),
    date_debut DATE,
    date_fin DATE,
    reduction NUMERIC(5,2),
    actif BOOLEAN DEFAULT TRUE
);

-- ==========================================
-- TABLE EVENEMENT
-- ==========================================
CREATE TABLE evenement (
    id_evenement SERIAL PRIMARY KEY,
    titre VARCHAR(150),
    description TEXT,
    image VARCHAR(255),
    date_debut TIMESTAMP,
    date_fin TIMESTAMP,
    points_offerts INT DEFAULT 0
);

-- ==========================================
-- TABLE COMMANDE
-- ==========================================
CREATE TABLE commande (
    id_commande SERIAL PRIMARY KEY,
    id_utilisateur INT NOT NULL REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
    montant_total NUMERIC(10,2) NOT NULL,
    points_utilises INT DEFAULT 0,
    points_gagnes INT DEFAULT 0,
    date_commande TIMESTAMP DEFAULT now(),
    mode_livraison VARCHAR(50),
    commentaire TEXT
);

-- ==========================================
-- TABLE PANIER
-- ==========================================
CREATE TABLE panier (
    id_panier SERIAL PRIMARY KEY,
    id_commande INT NOT NULL REFERENCES commande(id_commande) ON DELETE CASCADE,
    id_menu INT NOT NULL REFERENCES menu(id_menu) ON DELETE RESTRICT,
    quantite INT NOT NULL CHECK (quantite > 0),
    prix_unitaire NUMERIC(8,2) NOT NULL
);

-- ==========================================
-- TABLE PAIEMENT
-- ==========================================
CREATE TABLE paiement (
    id_paiement SERIAL PRIMARY KEY,
    id_commande INT NOT NULL REFERENCES commande(id_commande) ON DELETE CASCADE,
    montant NUMERIC(10,2),
    methode_paiement t_methode_paiement,
    statut t_statut_paiement DEFAULT 'en_attente',
    date_paiement TIMESTAMP DEFAULT now()
);

-- ==========================================
-- TABLE RECLAMATION
-- ==========================================
CREATE TABLE reclamation (
    id_reclamation SERIAL PRIMARY KEY,
    id_etudiant INT NOT NULL REFERENCES etudiant(id_etudiant) ON DELETE CASCADE,
    id_commande INT REFERENCES commande(id_commande) ON DELETE SET NULL,
    description TEXT,
    statut t_statut_reclamation DEFAULT 'ouverte',
    date_reclamation TIMESTAMP DEFAULT now(),
    reponse TEXT
);

-- ==========================================
-- TABLE HISTORIQUE_POINTS
-- ==========================================
CREATE TABLE historique_points (
    id_historique SERIAL PRIMARY KEY,
    id_etudiant INT NOT NULL REFERENCES etudiant(id_etudiant) ON DELETE CASCADE,
    points_gagnes INT DEFAULT 0,
    points_utilises INT DEFAULT 0,
    description TEXT,
    date_operation TIMESTAMP DEFAULT now()
);

-- ==========================================
-- TABLE PARRAINAGE
-- ==========================================
CREATE TABLE parrainage (
    id_parrainage SERIAL PRIMARY KEY,
    id_parrain INT NOT NULL REFERENCES etudiant(id_etudiant) ON DELETE CASCADE,
    id_filleul INT NOT NULL REFERENCES etudiant(id_etudiant) ON DELETE CASCADE,
    date_parrainage DATE DEFAULT CURRENT_DATE,
    recompense_attribuee BOOLEAN DEFAULT FALSE,
    UNIQUE (id_parrain, id_filleul)
);

-- ==========================================
-- TABLE PARTICIPATION EVENEMENT
-- ==========================================
CREATE TABLE participation_evenement (
    id_utilisateur INT REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
    id_evenement INT REFERENCES evenement(id_evenement) ON DELETE CASCADE,
    date_participation TIMESTAMP DEFAULT now(),
    PRIMARY KEY (id_utilisateur, id_evenement)
);

-- ==========================================
-- TABLE BENEFICIE PROMOTION
-- ==========================================
CREATE TABLE beneficie_promotion (
    id_etudiant INT REFERENCES etudiant(id_etudiant) ON DELETE CASCADE,
    id_promotion INT REFERENCES promotion(id_promotion) ON DELETE CASCADE,
    date_obtention TIMESTAMP DEFAULT now(),
    PRIMARY KEY (id_etudiant, id_promotion)
);
