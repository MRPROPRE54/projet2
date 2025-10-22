--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: miam; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA miam;


ALTER SCHEMA miam OWNER TO postgres;

--
-- Name: mm; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA mm;


ALTER SCHEMA mm OWNER TO postgres;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: t_methode_paiement; Type: TYPE; Schema: miam; Owner: postgres
--

CREATE TYPE miam.t_methode_paiement AS ENUM (
    'carte',
    'mobile_money',
    'points'
);


ALTER TYPE miam.t_methode_paiement OWNER TO postgres;

--
-- Name: t_statut_compte; Type: TYPE; Schema: miam; Owner: postgres
--

CREATE TYPE miam.t_statut_compte AS ENUM (
    'actif',
    'inactif',
    'suspendu'
);


ALTER TYPE miam.t_statut_compte OWNER TO postgres;

--
-- Name: t_statut_paiement; Type: TYPE; Schema: miam; Owner: postgres
--

CREATE TYPE miam.t_statut_paiement AS ENUM (
    'en_attente',
    'effectue',
    'annule'
);


ALTER TYPE miam.t_statut_paiement OWNER TO postgres;

--
-- Name: t_statut_reclamation; Type: TYPE; Schema: miam; Owner: postgres
--

CREATE TYPE miam.t_statut_reclamation AS ENUM (
    'ouverte',
    'en_cours',
    'resolue',
    'fermee'
);


ALTER TYPE miam.t_statut_reclamation OWNER TO postgres;

--
-- Name: t_type_utilisateur; Type: TYPE; Schema: miam; Owner: postgres
--

CREATE TYPE miam.t_type_utilisateur AS ENUM (
    'etudiant',
    'employe',
    'gerant',
    'administrateur'
);


ALTER TYPE miam.t_type_utilisateur OWNER TO postgres;

--
-- Name: t_methode_paiement; Type: TYPE; Schema: mm; Owner: postgres
--

CREATE TYPE mm.t_methode_paiement AS ENUM (
    'carte',
    'mobile_money',
    'points'
);


ALTER TYPE mm.t_methode_paiement OWNER TO postgres;

--
-- Name: t_statut_compte; Type: TYPE; Schema: mm; Owner: postgres
--

CREATE TYPE mm.t_statut_compte AS ENUM (
    'actif',
    'inactif',
    'suspendu'
);


ALTER TYPE mm.t_statut_compte OWNER TO postgres;

--
-- Name: t_statut_paiement; Type: TYPE; Schema: mm; Owner: postgres
--

CREATE TYPE mm.t_statut_paiement AS ENUM (
    'en_attente',
    'effectue',
    'annule'
);


ALTER TYPE mm.t_statut_paiement OWNER TO postgres;

--
-- Name: t_statut_reclamation; Type: TYPE; Schema: mm; Owner: postgres
--

CREATE TYPE mm.t_statut_reclamation AS ENUM (
    'ouverte',
    'en_cours',
    'resolue',
    'fermee'
);


ALTER TYPE mm.t_statut_reclamation OWNER TO postgres;

--
-- Name: t_type_utilisateur; Type: TYPE; Schema: mm; Owner: postgres
--

CREATE TYPE mm.t_type_utilisateur AS ENUM (
    'etudiant',
    'employe',
    'gerant',
    'administrateur'
);


ALTER TYPE mm.t_type_utilisateur OWNER TO postgres;

--
-- Name: t_methode_paiement; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.t_methode_paiement AS ENUM (
    'carte',
    'mobile_money',
    'points'
);


ALTER TYPE public.t_methode_paiement OWNER TO postgres;

--
-- Name: t_statut_compte; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.t_statut_compte AS ENUM (
    'actif',
    'inactif',
    'suspendu'
);


ALTER TYPE public.t_statut_compte OWNER TO postgres;

--
-- Name: t_statut_paiement; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.t_statut_paiement AS ENUM (
    'en_attente',
    'effectue',
    'annule'
);


ALTER TYPE public.t_statut_paiement OWNER TO postgres;

--
-- Name: t_statut_reclamation; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.t_statut_reclamation AS ENUM (
    'ouverte',
    'en_cours',
    'resolue',
    'fermee'
);


ALTER TYPE public.t_statut_reclamation OWNER TO postgres;

--
-- Name: t_type_utilisateur; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.t_type_utilisateur AS ENUM (
    'etudiant',
    'employe',
    'gerant',
    'administrateur'
);


ALTER TYPE public.t_type_utilisateur OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: administrateur; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.administrateur (
    id_admin integer NOT NULL,
    droits_complets boolean DEFAULT true
);


ALTER TABLE miam.administrateur OWNER TO postgres;

--
-- Name: beneficie_promotion; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.beneficie_promotion (
    id_etudiant integer NOT NULL,
    id_promotion integer NOT NULL,
    date_obtention timestamp without time zone DEFAULT now()
);


ALTER TABLE miam.beneficie_promotion OWNER TO postgres;

--
-- Name: cache; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE miam.cache OWNER TO postgres;

--
-- Name: cache_locks; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE miam.cache_locks OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.categories (
    id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE miam.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.categories_id_seq OWNED BY miam.categories.id;


--
-- Name: commande; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.commande (
    id_commande integer NOT NULL,
    id_utilisateur integer NOT NULL,
    montant_total numeric(10,2) NOT NULL,
    points_utilises integer DEFAULT 0,
    points_gagnes integer DEFAULT 0,
    date_commande timestamp without time zone DEFAULT now(),
    mode_livraison character varying(50),
    commentaire text
);


ALTER TABLE miam.commande OWNER TO postgres;

--
-- Name: commande_id_commande_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.commande_id_commande_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.commande_id_commande_seq OWNER TO postgres;

--
-- Name: commande_id_commande_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.commande_id_commande_seq OWNED BY miam.commande.id_commande;


--
-- Name: employe; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.employe (
    id_employe integer NOT NULL,
    poste character varying(100),
    date_embauche date DEFAULT CURRENT_DATE
);


ALTER TABLE miam.employe OWNER TO postgres;

--
-- Name: etudiant; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.etudiant (
    id_etudiant integer NOT NULL,
    points_fidelite integer DEFAULT 0,
    code_parrainage character varying(50),
    id_parrain integer
);


ALTER TABLE miam.etudiant OWNER TO postgres;

--
-- Name: evenement; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.evenement (
    id_evenement integer NOT NULL,
    titre character varying(150),
    description text,
    image character varying(255),
    date_debut timestamp without time zone,
    date_fin timestamp without time zone,
    points_offerts integer DEFAULT 0
);


ALTER TABLE miam.evenement OWNER TO postgres;

--
-- Name: evenement_id_evenement_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.evenement_id_evenement_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.evenement_id_evenement_seq OWNER TO postgres;

--
-- Name: evenement_id_evenement_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.evenement_id_evenement_seq OWNED BY miam.evenement.id_evenement;


--
-- Name: failed_jobs; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE miam.failed_jobs OWNER TO postgres;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.failed_jobs_id_seq OWNER TO postgres;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.failed_jobs_id_seq OWNED BY miam.failed_jobs.id;


--
-- Name: gerant; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.gerant (
    id_gerant integer NOT NULL,
    niveau_acces character varying(50)
);


ALTER TABLE miam.gerant OWNER TO postgres;

--
-- Name: historique_points; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.historique_points (
    id_historique integer NOT NULL,
    id_etudiant integer NOT NULL,
    points_gagnes integer DEFAULT 0,
    points_utilises integer DEFAULT 0,
    description text,
    date_operation timestamp without time zone DEFAULT now()
);


ALTER TABLE miam.historique_points OWNER TO postgres;

--
-- Name: historique_points_id_historique_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.historique_points_id_historique_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.historique_points_id_historique_seq OWNER TO postgres;

--
-- Name: historique_points_id_historique_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.historique_points_id_historique_seq OWNED BY miam.historique_points.id_historique;


--
-- Name: job_batches; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


ALTER TABLE miam.job_batches OWNER TO postgres;

--
-- Name: jobs; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE miam.jobs OWNER TO postgres;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.jobs_id_seq OWNER TO postgres;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.jobs_id_seq OWNED BY miam.jobs.id;


--
-- Name: menu; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.menu (
    id_menu integer NOT NULL,
    nom_plat character varying(100) NOT NULL,
    description text,
    prix numeric(8,2) NOT NULL,
    categorie character varying(100),
    image character varying(255),
    disponible boolean DEFAULT true,
    date_ajout timestamp without time zone DEFAULT now()
);


ALTER TABLE miam.menu OWNER TO postgres;

--
-- Name: menu_id_menu_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.menu_id_menu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.menu_id_menu_seq OWNER TO postgres;

--
-- Name: menu_id_menu_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.menu_id_menu_seq OWNED BY miam.menu.id_menu;


--
-- Name: migrations; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE miam.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.migrations_id_seq OWNED BY miam.migrations.id;


--
-- Name: order_items; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.order_items (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    product_id bigint NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE miam.order_items OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.order_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.order_items_id_seq OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.order_items_id_seq OWNED BY miam.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.orders (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    total numeric(10,2) NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE miam.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.orders_id_seq OWNED BY miam.orders.id;


--
-- Name: paiement; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.paiement (
    id_paiement integer NOT NULL,
    id_commande integer NOT NULL,
    montant numeric(10,2),
    methode_paiement miam.t_methode_paiement,
    statut miam.t_statut_paiement DEFAULT 'en_attente'::miam.t_statut_paiement,
    date_paiement timestamp without time zone DEFAULT now()
);


ALTER TABLE miam.paiement OWNER TO postgres;

--
-- Name: paiement_id_paiement_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.paiement_id_paiement_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.paiement_id_paiement_seq OWNER TO postgres;

--
-- Name: paiement_id_paiement_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.paiement_id_paiement_seq OWNED BY miam.paiement.id_paiement;


--
-- Name: panier; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.panier (
    id_panier integer NOT NULL,
    id_commande integer NOT NULL,
    id_menu integer NOT NULL,
    quantite integer NOT NULL,
    prix_unitaire numeric(8,2) NOT NULL,
    CONSTRAINT panier_quantite_check CHECK ((quantite > 0))
);


ALTER TABLE miam.panier OWNER TO postgres;

--
-- Name: panier_id_panier_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.panier_id_panier_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.panier_id_panier_seq OWNER TO postgres;

--
-- Name: panier_id_panier_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.panier_id_panier_seq OWNED BY miam.panier.id_panier;


--
-- Name: parrainage; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.parrainage (
    id_parrainage integer NOT NULL,
    id_parrain integer NOT NULL,
    id_filleul integer NOT NULL,
    date_parrainage date DEFAULT CURRENT_DATE,
    recompense_attribuee boolean DEFAULT false
);


ALTER TABLE miam.parrainage OWNER TO postgres;

--
-- Name: parrainage_id_parrainage_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.parrainage_id_parrainage_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.parrainage_id_parrainage_seq OWNER TO postgres;

--
-- Name: parrainage_id_parrainage_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.parrainage_id_parrainage_seq OWNED BY miam.parrainage.id_parrainage;


--
-- Name: participation_evenement; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.participation_evenement (
    id_utilisateur integer NOT NULL,
    id_evenement integer NOT NULL,
    date_participation timestamp without time zone DEFAULT now()
);


ALTER TABLE miam.participation_evenement OWNER TO postgres;

--
-- Name: password_reset_tokens; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE miam.password_reset_tokens OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.products (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    category_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE miam.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.products_id_seq OWNED BY miam.products.id;


--
-- Name: promotion; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.promotion (
    id_promotion integer NOT NULL,
    titre character varying(150),
    description text,
    image character varying(255),
    date_debut date,
    date_fin date,
    reduction numeric(5,2),
    actif boolean DEFAULT true
);


ALTER TABLE miam.promotion OWNER TO postgres;

--
-- Name: promotion_id_promotion_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.promotion_id_promotion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.promotion_id_promotion_seq OWNER TO postgres;

--
-- Name: promotion_id_promotion_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.promotion_id_promotion_seq OWNED BY miam.promotion.id_promotion;


--
-- Name: reclamation; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.reclamation (
    id_reclamation integer NOT NULL,
    id_etudiant integer NOT NULL,
    id_commande integer,
    description text,
    statut miam.t_statut_reclamation DEFAULT 'ouverte'::miam.t_statut_reclamation,
    date_reclamation timestamp without time zone DEFAULT now(),
    reponse text
);


ALTER TABLE miam.reclamation OWNER TO postgres;

--
-- Name: reclamation_id_reclamation_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.reclamation_id_reclamation_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.reclamation_id_reclamation_seq OWNER TO postgres;

--
-- Name: reclamation_id_reclamation_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.reclamation_id_reclamation_seq OWNED BY miam.reclamation.id_reclamation;


--
-- Name: sessions; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


ALTER TABLE miam.sessions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE miam.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.users_id_seq OWNED BY miam.users.id;


--
-- Name: utilisateur; Type: TABLE; Schema: miam; Owner: postgres
--

CREATE TABLE miam.utilisateur (
    id_utilisateur integer NOT NULL,
    nom character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    mot_de_passe_hash character varying(255) NOT NULL,
    telephone character varying(30),
    localisation character varying(150),
    date_inscription timestamp without time zone DEFAULT now(),
    statut_compte miam.t_statut_compte DEFAULT 'actif'::miam.t_statut_compte,
    type_utilisateur miam.t_type_utilisateur NOT NULL
);


ALTER TABLE miam.utilisateur OWNER TO postgres;

--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE; Schema: miam; Owner: postgres
--

CREATE SEQUENCE miam.utilisateur_id_utilisateur_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE miam.utilisateur_id_utilisateur_seq OWNER TO postgres;

--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE OWNED BY; Schema: miam; Owner: postgres
--

ALTER SEQUENCE miam.utilisateur_id_utilisateur_seq OWNED BY miam.utilisateur.id_utilisateur;


--
-- Name: administrateur; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.administrateur (
    id_admin integer NOT NULL,
    droits_complets boolean DEFAULT true
);


ALTER TABLE mm.administrateur OWNER TO postgres;

--
-- Name: beneficie_promotion; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.beneficie_promotion (
    id_etudiant integer NOT NULL,
    id_promotion integer NOT NULL,
    date_obtention timestamp without time zone DEFAULT now()
);


ALTER TABLE mm.beneficie_promotion OWNER TO postgres;

--
-- Name: cache; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE mm.cache OWNER TO postgres;

--
-- Name: cache_locks; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE mm.cache_locks OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.categories (
    id_categorie bigint NOT NULL,
    nom character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE mm.categories OWNER TO postgres;

--
-- Name: categories_id_categorie_seq; Type: SEQUENCE; Schema: mm; Owner: postgres
--

CREATE SEQUENCE mm.categories_id_categorie_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE mm.categories_id_categorie_seq OWNER TO postgres;

--
-- Name: categories_id_categorie_seq; Type: SEQUENCE OWNED BY; Schema: mm; Owner: postgres
--

ALTER SEQUENCE mm.categories_id_categorie_seq OWNED BY mm.categories.id_categorie;


--
-- Name: commande; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.commande (
    id_commande integer NOT NULL,
    id_utilisateur integer NOT NULL,
    montant_total numeric(10,2) NOT NULL,
    points_utilises integer DEFAULT 0,
    points_gagnes integer DEFAULT 0,
    date_commande timestamp without time zone DEFAULT now(),
    mode_livraison character varying(50),
    commentaire text
);


ALTER TABLE mm.commande OWNER TO postgres;

--
-- Name: commande_id_commande_seq; Type: SEQUENCE; Schema: mm; Owner: postgres
--

CREATE SEQUENCE mm.commande_id_commande_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE mm.commande_id_commande_seq OWNER TO postgres;

--
-- Name: commande_id_commande_seq; Type: SEQUENCE OWNED BY; Schema: mm; Owner: postgres
--

ALTER SEQUENCE mm.commande_id_commande_seq OWNED BY mm.commande.id_commande;


--
-- Name: employe; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.employe (
    id_employe integer NOT NULL,
    poste character varying(100),
    date_embauche date DEFAULT CURRENT_DATE
);


ALTER TABLE mm.employe OWNER TO postgres;

--
-- Name: etudiant; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.etudiant (
    id_etudiant integer NOT NULL,
    points_fidelite integer DEFAULT 0,
    code_parrainage character varying(50),
    id_parrain integer
);


ALTER TABLE mm.etudiant OWNER TO postgres;

--
-- Name: evenement; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.evenement (
    id_evenement integer NOT NULL,
    titre character varying(150),
    description text,
    image character varying(255),
    date_debut timestamp without time zone,
    date_fin timestamp without time zone,
    points_offerts integer DEFAULT 0
);


ALTER TABLE mm.evenement OWNER TO postgres;

--
-- Name: evenement_id_evenement_seq; Type: SEQUENCE; Schema: mm; Owner: postgres
--

CREATE SEQUENCE mm.evenement_id_evenement_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE mm.evenement_id_evenement_seq OWNER TO postgres;

--
-- Name: evenement_id_evenement_seq; Type: SEQUENCE OWNED BY; Schema: mm; Owner: postgres
--

ALTER SEQUENCE mm.evenement_id_evenement_seq OWNED BY mm.evenement.id_evenement;


--
-- Name: failed_jobs; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE mm.failed_jobs OWNER TO postgres;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: mm; Owner: postgres
--

CREATE SEQUENCE mm.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE mm.failed_jobs_id_seq OWNER TO postgres;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: mm; Owner: postgres
--

ALTER SEQUENCE mm.failed_jobs_id_seq OWNED BY mm.failed_jobs.id;


--
-- Name: gerant; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.gerant (
    id_gerant integer NOT NULL,
    niveau_acces character varying(50)
);


ALTER TABLE mm.gerant OWNER TO postgres;

--
-- Name: historique_points; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.historique_points (
    id_historique integer NOT NULL,
    id_etudiant integer NOT NULL,
    points_gagnes integer DEFAULT 0,
    points_utilises integer DEFAULT 0,
    description text,
    date_operation timestamp without time zone DEFAULT now()
);


ALTER TABLE mm.historique_points OWNER TO postgres;

--
-- Name: historique_points_id_historique_seq; Type: SEQUENCE; Schema: mm; Owner: postgres
--

CREATE SEQUENCE mm.historique_points_id_historique_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE mm.historique_points_id_historique_seq OWNER TO postgres;

--
-- Name: historique_points_id_historique_seq; Type: SEQUENCE OWNED BY; Schema: mm; Owner: postgres
--

ALTER SEQUENCE mm.historique_points_id_historique_seq OWNED BY mm.historique_points.id_historique;


--
-- Name: job_batches; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


ALTER TABLE mm.job_batches OWNER TO postgres;

--
-- Name: jobs; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE mm.jobs OWNER TO postgres;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: mm; Owner: postgres
--

CREATE SEQUENCE mm.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE mm.jobs_id_seq OWNER TO postgres;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: mm; Owner: postgres
--

ALTER SEQUENCE mm.jobs_id_seq OWNED BY mm.jobs.id;


--
-- Name: menu; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.menu (
    id_menu integer NOT NULL,
    nom_plat character varying(100) NOT NULL,
    description text,
    prix numeric(8,2) NOT NULL,
    categorie character varying(100),
    image character varying(255),
    disponible boolean DEFAULT true,
    date_ajout timestamp without time zone DEFAULT now(),
    id_gerant bigint,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE mm.menu OWNER TO postgres;

--
-- Name: menu_id_menu_seq; Type: SEQUENCE; Schema: mm; Owner: postgres
--

CREATE SEQUENCE mm.menu_id_menu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE mm.menu_id_menu_seq OWNER TO postgres;

--
-- Name: menu_id_menu_seq; Type: SEQUENCE OWNED BY; Schema: mm; Owner: postgres
--

ALTER SEQUENCE mm.menu_id_menu_seq OWNED BY mm.menu.id_menu;


--
-- Name: migrations; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE mm.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: mm; Owner: postgres
--

CREATE SEQUENCE mm.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE mm.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: mm; Owner: postgres
--

ALTER SEQUENCE mm.migrations_id_seq OWNED BY mm.migrations.id;


--
-- Name: paiement; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.paiement (
    id_paiement integer NOT NULL,
    id_commande integer NOT NULL,
    montant numeric(10,2),
    methode_paiement mm.t_methode_paiement,
    statut mm.t_statut_paiement DEFAULT 'en_attente'::mm.t_statut_paiement,
    date_paiement timestamp without time zone DEFAULT now()
);


ALTER TABLE mm.paiement OWNER TO postgres;

--
-- Name: paiement_id_paiement_seq; Type: SEQUENCE; Schema: mm; Owner: postgres
--

CREATE SEQUENCE mm.paiement_id_paiement_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE mm.paiement_id_paiement_seq OWNER TO postgres;

--
-- Name: paiement_id_paiement_seq; Type: SEQUENCE OWNED BY; Schema: mm; Owner: postgres
--

ALTER SEQUENCE mm.paiement_id_paiement_seq OWNED BY mm.paiement.id_paiement;


--
-- Name: panier; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.panier (
    id_panier integer NOT NULL,
    id_commande integer NOT NULL,
    id_menu integer NOT NULL,
    quantite integer NOT NULL,
    prix_unitaire numeric(8,2) NOT NULL,
    CONSTRAINT panier_quantite_check CHECK ((quantite > 0))
);


ALTER TABLE mm.panier OWNER TO postgres;

--
-- Name: panier_id_panier_seq; Type: SEQUENCE; Schema: mm; Owner: postgres
--

CREATE SEQUENCE mm.panier_id_panier_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE mm.panier_id_panier_seq OWNER TO postgres;

--
-- Name: panier_id_panier_seq; Type: SEQUENCE OWNED BY; Schema: mm; Owner: postgres
--

ALTER SEQUENCE mm.panier_id_panier_seq OWNED BY mm.panier.id_panier;


--
-- Name: parrainage; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.parrainage (
    id_parrainage integer NOT NULL,
    id_parrain integer NOT NULL,
    id_filleul integer NOT NULL,
    date_parrainage date DEFAULT CURRENT_DATE,
    recompense_attribuee boolean DEFAULT false
);


ALTER TABLE mm.parrainage OWNER TO postgres;

--
-- Name: parrainage_id_parrainage_seq; Type: SEQUENCE; Schema: mm; Owner: postgres
--

CREATE SEQUENCE mm.parrainage_id_parrainage_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE mm.parrainage_id_parrainage_seq OWNER TO postgres;

--
-- Name: parrainage_id_parrainage_seq; Type: SEQUENCE OWNED BY; Schema: mm; Owner: postgres
--

ALTER SEQUENCE mm.parrainage_id_parrainage_seq OWNED BY mm.parrainage.id_parrainage;


--
-- Name: participation_evenement; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.participation_evenement (
    id_utilisateur integer NOT NULL,
    id_evenement integer NOT NULL,
    date_participation timestamp without time zone DEFAULT now()
);


ALTER TABLE mm.participation_evenement OWNER TO postgres;

--
-- Name: password_reset_tokens; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE mm.password_reset_tokens OWNER TO postgres;

--
-- Name: promotion; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.promotion (
    id_promotion integer NOT NULL,
    titre character varying(150),
    description text,
    image character varying(255),
    date_debut date,
    date_fin date,
    reduction numeric(5,2),
    actif boolean DEFAULT true
);


ALTER TABLE mm.promotion OWNER TO postgres;

--
-- Name: promotion_id_promotion_seq; Type: SEQUENCE; Schema: mm; Owner: postgres
--

CREATE SEQUENCE mm.promotion_id_promotion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE mm.promotion_id_promotion_seq OWNER TO postgres;

--
-- Name: promotion_id_promotion_seq; Type: SEQUENCE OWNED BY; Schema: mm; Owner: postgres
--

ALTER SEQUENCE mm.promotion_id_promotion_seq OWNED BY mm.promotion.id_promotion;


--
-- Name: reclamation; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.reclamation (
    id_reclamation integer NOT NULL,
    id_etudiant integer NOT NULL,
    id_commande integer,
    description text,
    statut mm.t_statut_reclamation DEFAULT 'ouverte'::mm.t_statut_reclamation,
    date_reclamation timestamp without time zone DEFAULT now(),
    reponse text
);


ALTER TABLE mm.reclamation OWNER TO postgres;

--
-- Name: reclamation_id_reclamation_seq; Type: SEQUENCE; Schema: mm; Owner: postgres
--

CREATE SEQUENCE mm.reclamation_id_reclamation_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE mm.reclamation_id_reclamation_seq OWNER TO postgres;

--
-- Name: reclamation_id_reclamation_seq; Type: SEQUENCE OWNED BY; Schema: mm; Owner: postgres
--

ALTER SEQUENCE mm.reclamation_id_reclamation_seq OWNED BY mm.reclamation.id_reclamation;


--
-- Name: sessions; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


ALTER TABLE mm.sessions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE mm.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: mm; Owner: postgres
--

CREATE SEQUENCE mm.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE mm.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: mm; Owner: postgres
--

ALTER SEQUENCE mm.users_id_seq OWNED BY mm.users.id;


--
-- Name: utilisateur; Type: TABLE; Schema: mm; Owner: postgres
--

CREATE TABLE mm.utilisateur (
    id_utilisateur integer NOT NULL,
    nom character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    mot_de_passe_hash character varying(255) NOT NULL,
    telephone character varying(30),
    localisation character varying(150),
    date_inscription timestamp without time zone DEFAULT now(),
    statut_compte mm.t_statut_compte DEFAULT 'actif'::mm.t_statut_compte,
    type_utilisateur mm.t_type_utilisateur NOT NULL
);


ALTER TABLE mm.utilisateur OWNER TO postgres;

--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE; Schema: mm; Owner: postgres
--

CREATE SEQUENCE mm.utilisateur_id_utilisateur_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE mm.utilisateur_id_utilisateur_seq OWNER TO postgres;

--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE OWNED BY; Schema: mm; Owner: postgres
--

ALTER SEQUENCE mm.utilisateur_id_utilisateur_seq OWNED BY mm.utilisateur.id_utilisateur;


--
-- Name: administrateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.administrateur (
    id_admin integer NOT NULL,
    droits_complets boolean DEFAULT true
);


ALTER TABLE public.administrateur OWNER TO postgres;

--
-- Name: beneficie_promotion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.beneficie_promotion (
    id_etudiant integer NOT NULL,
    id_promotion integer NOT NULL,
    date_obtention timestamp without time zone DEFAULT now()
);


ALTER TABLE public.beneficie_promotion OWNER TO postgres;

--
-- Name: commande; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.commande (
    id_commande integer NOT NULL,
    id_utilisateur integer NOT NULL,
    montant_total numeric(10,2) NOT NULL,
    points_utilises integer DEFAULT 0,
    points_gagnes integer DEFAULT 0,
    date_commande timestamp without time zone DEFAULT now(),
    mode_livraison character varying(50),
    commentaire text
);


ALTER TABLE public.commande OWNER TO postgres;

--
-- Name: commande_id_commande_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.commande_id_commande_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.commande_id_commande_seq OWNER TO postgres;

--
-- Name: commande_id_commande_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.commande_id_commande_seq OWNED BY public.commande.id_commande;


--
-- Name: employe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employe (
    id_employe integer NOT NULL,
    poste character varying(100),
    date_embauche date DEFAULT CURRENT_DATE
);


ALTER TABLE public.employe OWNER TO postgres;

--
-- Name: etudiant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.etudiant (
    id_etudiant integer NOT NULL,
    points_fidelite integer DEFAULT 0,
    code_parrainage character varying(50),
    id_parrain integer
);


ALTER TABLE public.etudiant OWNER TO postgres;

--
-- Name: evenement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evenement (
    id_evenement integer NOT NULL,
    titre character varying(150),
    description text,
    image character varying(255),
    date_debut timestamp without time zone,
    date_fin timestamp without time zone,
    points_offerts integer DEFAULT 0
);


ALTER TABLE public.evenement OWNER TO postgres;

--
-- Name: evenement_id_evenement_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evenement_id_evenement_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evenement_id_evenement_seq OWNER TO postgres;

--
-- Name: evenement_id_evenement_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evenement_id_evenement_seq OWNED BY public.evenement.id_evenement;


--
-- Name: gerant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gerant (
    id_gerant integer NOT NULL,
    niveau_acces character varying(50)
);


ALTER TABLE public.gerant OWNER TO postgres;

--
-- Name: historique_points; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historique_points (
    id_historique integer NOT NULL,
    id_etudiant integer NOT NULL,
    points_gagnes integer DEFAULT 0,
    points_utilises integer DEFAULT 0,
    description text,
    date_operation timestamp without time zone DEFAULT now()
);


ALTER TABLE public.historique_points OWNER TO postgres;

--
-- Name: historique_points_id_historique_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historique_points_id_historique_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historique_points_id_historique_seq OWNER TO postgres;

--
-- Name: historique_points_id_historique_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historique_points_id_historique_seq OWNED BY public.historique_points.id_historique;


--
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu (
    id_menu integer NOT NULL,
    nom_plat character varying(100) NOT NULL,
    description text,
    prix numeric(8,2) NOT NULL,
    categorie character varying(100),
    image character varying(255),
    disponible boolean DEFAULT true,
    date_ajout timestamp without time zone DEFAULT now(),
    id_gerant integer
);


ALTER TABLE public.menu OWNER TO postgres;

--
-- Name: menu_id_menu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menu_id_menu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.menu_id_menu_seq OWNER TO postgres;

--
-- Name: menu_id_menu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_id_menu_seq OWNED BY public.menu.id_menu;


--
-- Name: paiement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.paiement (
    id_paiement integer NOT NULL,
    id_commande integer NOT NULL,
    montant numeric(10,2),
    methode_paiement public.t_methode_paiement,
    statut public.t_statut_paiement DEFAULT 'en_attente'::public.t_statut_paiement,
    date_paiement timestamp without time zone DEFAULT now()
);


ALTER TABLE public.paiement OWNER TO postgres;

--
-- Name: paiement_id_paiement_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.paiement_id_paiement_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.paiement_id_paiement_seq OWNER TO postgres;

--
-- Name: paiement_id_paiement_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.paiement_id_paiement_seq OWNED BY public.paiement.id_paiement;


--
-- Name: panier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.panier (
    id_panier integer NOT NULL,
    id_commande integer NOT NULL,
    id_menu integer NOT NULL,
    quantite integer NOT NULL,
    prix_unitaire numeric(8,2) NOT NULL,
    CONSTRAINT panier_quantite_check CHECK ((quantite > 0))
);


ALTER TABLE public.panier OWNER TO postgres;

--
-- Name: panier_id_panier_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.panier_id_panier_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.panier_id_panier_seq OWNER TO postgres;

--
-- Name: panier_id_panier_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.panier_id_panier_seq OWNED BY public.panier.id_panier;


--
-- Name: parrainage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parrainage (
    id_parrainage integer NOT NULL,
    id_parrain integer NOT NULL,
    id_filleul integer NOT NULL,
    date_parrainage date DEFAULT CURRENT_DATE,
    recompense_attribuee boolean DEFAULT false
);


ALTER TABLE public.parrainage OWNER TO postgres;

--
-- Name: parrainage_id_parrainage_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parrainage_id_parrainage_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parrainage_id_parrainage_seq OWNER TO postgres;

--
-- Name: parrainage_id_parrainage_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parrainage_id_parrainage_seq OWNED BY public.parrainage.id_parrainage;


--
-- Name: participation_evenement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.participation_evenement (
    id_utilisateur integer NOT NULL,
    id_evenement integer NOT NULL,
    date_participation timestamp without time zone DEFAULT now()
);


ALTER TABLE public.participation_evenement OWNER TO postgres;

--
-- Name: promotion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promotion (
    id_promotion integer NOT NULL,
    titre character varying(150),
    description text,
    image character varying(255),
    date_debut date,
    date_fin date,
    reduction numeric(5,2),
    actif boolean DEFAULT true
);


ALTER TABLE public.promotion OWNER TO postgres;

--
-- Name: promotion_id_promotion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.promotion_id_promotion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.promotion_id_promotion_seq OWNER TO postgres;

--
-- Name: promotion_id_promotion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.promotion_id_promotion_seq OWNED BY public.promotion.id_promotion;


--
-- Name: reclamation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reclamation (
    id_reclamation integer NOT NULL,
    id_etudiant integer NOT NULL,
    id_commande integer,
    description text,
    statut public.t_statut_reclamation DEFAULT 'ouverte'::public.t_statut_reclamation,
    date_reclamation timestamp without time zone DEFAULT now(),
    reponse text
);


ALTER TABLE public.reclamation OWNER TO postgres;

--
-- Name: reclamation_id_reclamation_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reclamation_id_reclamation_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reclamation_id_reclamation_seq OWNER TO postgres;

--
-- Name: reclamation_id_reclamation_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reclamation_id_reclamation_seq OWNED BY public.reclamation.id_reclamation;


--
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur (
    id_utilisateur integer NOT NULL,
    nom character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    mot_de_passe_hash character varying(255) NOT NULL,
    telephone character varying(30),
    localisation character varying(150),
    date_inscription timestamp without time zone DEFAULT now(),
    statut_compte public.t_statut_compte DEFAULT 'actif'::public.t_statut_compte,
    type_utilisateur public.t_type_utilisateur NOT NULL
);


ALTER TABLE public.utilisateur OWNER TO postgres;

--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.utilisateur_id_utilisateur_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.utilisateur_id_utilisateur_seq OWNER TO postgres;

--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.utilisateur_id_utilisateur_seq OWNED BY public.utilisateur.id_utilisateur;


--
-- Name: categories id; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.categories ALTER COLUMN id SET DEFAULT nextval('miam.categories_id_seq'::regclass);


--
-- Name: commande id_commande; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.commande ALTER COLUMN id_commande SET DEFAULT nextval('miam.commande_id_commande_seq'::regclass);


--
-- Name: evenement id_evenement; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.evenement ALTER COLUMN id_evenement SET DEFAULT nextval('miam.evenement_id_evenement_seq'::regclass);


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.failed_jobs ALTER COLUMN id SET DEFAULT nextval('miam.failed_jobs_id_seq'::regclass);


--
-- Name: historique_points id_historique; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.historique_points ALTER COLUMN id_historique SET DEFAULT nextval('miam.historique_points_id_historique_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.jobs ALTER COLUMN id SET DEFAULT nextval('miam.jobs_id_seq'::regclass);


--
-- Name: menu id_menu; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.menu ALTER COLUMN id_menu SET DEFAULT nextval('miam.menu_id_menu_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.migrations ALTER COLUMN id SET DEFAULT nextval('miam.migrations_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.order_items ALTER COLUMN id SET DEFAULT nextval('miam.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.orders ALTER COLUMN id SET DEFAULT nextval('miam.orders_id_seq'::regclass);


--
-- Name: paiement id_paiement; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.paiement ALTER COLUMN id_paiement SET DEFAULT nextval('miam.paiement_id_paiement_seq'::regclass);


--
-- Name: panier id_panier; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.panier ALTER COLUMN id_panier SET DEFAULT nextval('miam.panier_id_panier_seq'::regclass);


--
-- Name: parrainage id_parrainage; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.parrainage ALTER COLUMN id_parrainage SET DEFAULT nextval('miam.parrainage_id_parrainage_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.products ALTER COLUMN id SET DEFAULT nextval('miam.products_id_seq'::regclass);


--
-- Name: promotion id_promotion; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.promotion ALTER COLUMN id_promotion SET DEFAULT nextval('miam.promotion_id_promotion_seq'::regclass);


--
-- Name: reclamation id_reclamation; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.reclamation ALTER COLUMN id_reclamation SET DEFAULT nextval('miam.reclamation_id_reclamation_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.users ALTER COLUMN id SET DEFAULT nextval('miam.users_id_seq'::regclass);


--
-- Name: utilisateur id_utilisateur; Type: DEFAULT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.utilisateur ALTER COLUMN id_utilisateur SET DEFAULT nextval('miam.utilisateur_id_utilisateur_seq'::regclass);


--
-- Name: categories id_categorie; Type: DEFAULT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.categories ALTER COLUMN id_categorie SET DEFAULT nextval('mm.categories_id_categorie_seq'::regclass);


--
-- Name: commande id_commande; Type: DEFAULT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.commande ALTER COLUMN id_commande SET DEFAULT nextval('mm.commande_id_commande_seq'::regclass);


--
-- Name: evenement id_evenement; Type: DEFAULT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.evenement ALTER COLUMN id_evenement SET DEFAULT nextval('mm.evenement_id_evenement_seq'::regclass);


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.failed_jobs ALTER COLUMN id SET DEFAULT nextval('mm.failed_jobs_id_seq'::regclass);


--
-- Name: historique_points id_historique; Type: DEFAULT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.historique_points ALTER COLUMN id_historique SET DEFAULT nextval('mm.historique_points_id_historique_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.jobs ALTER COLUMN id SET DEFAULT nextval('mm.jobs_id_seq'::regclass);


--
-- Name: menu id_menu; Type: DEFAULT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.menu ALTER COLUMN id_menu SET DEFAULT nextval('mm.menu_id_menu_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.migrations ALTER COLUMN id SET DEFAULT nextval('mm.migrations_id_seq'::regclass);


--
-- Name: paiement id_paiement; Type: DEFAULT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.paiement ALTER COLUMN id_paiement SET DEFAULT nextval('mm.paiement_id_paiement_seq'::regclass);


--
-- Name: panier id_panier; Type: DEFAULT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.panier ALTER COLUMN id_panier SET DEFAULT nextval('mm.panier_id_panier_seq'::regclass);


--
-- Name: parrainage id_parrainage; Type: DEFAULT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.parrainage ALTER COLUMN id_parrainage SET DEFAULT nextval('mm.parrainage_id_parrainage_seq'::regclass);


--
-- Name: promotion id_promotion; Type: DEFAULT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.promotion ALTER COLUMN id_promotion SET DEFAULT nextval('mm.promotion_id_promotion_seq'::regclass);


--
-- Name: reclamation id_reclamation; Type: DEFAULT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.reclamation ALTER COLUMN id_reclamation SET DEFAULT nextval('mm.reclamation_id_reclamation_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.users ALTER COLUMN id SET DEFAULT nextval('mm.users_id_seq'::regclass);


--
-- Name: utilisateur id_utilisateur; Type: DEFAULT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.utilisateur ALTER COLUMN id_utilisateur SET DEFAULT nextval('mm.utilisateur_id_utilisateur_seq'::regclass);


--
-- Name: commande id_commande; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commande ALTER COLUMN id_commande SET DEFAULT nextval('public.commande_id_commande_seq'::regclass);


--
-- Name: evenement id_evenement; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evenement ALTER COLUMN id_evenement SET DEFAULT nextval('public.evenement_id_evenement_seq'::regclass);


--
-- Name: historique_points id_historique; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historique_points ALTER COLUMN id_historique SET DEFAULT nextval('public.historique_points_id_historique_seq'::regclass);


--
-- Name: menu id_menu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu ALTER COLUMN id_menu SET DEFAULT nextval('public.menu_id_menu_seq'::regclass);


--
-- Name: paiement id_paiement; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiement ALTER COLUMN id_paiement SET DEFAULT nextval('public.paiement_id_paiement_seq'::regclass);


--
-- Name: panier id_panier; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.panier ALTER COLUMN id_panier SET DEFAULT nextval('public.panier_id_panier_seq'::regclass);


--
-- Name: parrainage id_parrainage; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parrainage ALTER COLUMN id_parrainage SET DEFAULT nextval('public.parrainage_id_parrainage_seq'::regclass);


--
-- Name: promotion id_promotion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotion ALTER COLUMN id_promotion SET DEFAULT nextval('public.promotion_id_promotion_seq'::regclass);


--
-- Name: reclamation id_reclamation; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reclamation ALTER COLUMN id_reclamation SET DEFAULT nextval('public.reclamation_id_reclamation_seq'::regclass);


--
-- Name: utilisateur id_utilisateur; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur ALTER COLUMN id_utilisateur SET DEFAULT nextval('public.utilisateur_id_utilisateur_seq'::regclass);


--
-- Data for Name: administrateur; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.administrateur (id_admin, droits_complets) FROM stdin;
\.


--
-- Data for Name: beneficie_promotion; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.beneficie_promotion (id_etudiant, id_promotion, date_obtention) FROM stdin;
\.


--
-- Data for Name: cache; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.cache (key, value, expiration) FROM stdin;
\.


--
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.cache_locks (key, owner, expiration) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.categories (id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: commande; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.commande (id_commande, id_utilisateur, montant_total, points_utilises, points_gagnes, date_commande, mode_livraison, commentaire) FROM stdin;
\.


--
-- Data for Name: employe; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.employe (id_employe, poste, date_embauche) FROM stdin;
\.


--
-- Data for Name: etudiant; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.etudiant (id_etudiant, points_fidelite, code_parrainage, id_parrain) FROM stdin;
\.


--
-- Data for Name: evenement; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.evenement (id_evenement, titre, description, image, date_debut, date_fin, points_offerts) FROM stdin;
\.


--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- Data for Name: gerant; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.gerant (id_gerant, niveau_acces) FROM stdin;
\.


--
-- Data for Name: historique_points; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.historique_points (id_historique, id_etudiant, points_gagnes, points_utilises, description, date_operation) FROM stdin;
\.


--
-- Data for Name: job_batches; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- Data for Name: menu; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.menu (id_menu, nom_plat, description, prix, categorie, image, disponible, date_ajout) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.migrations (id, migration, batch) FROM stdin;
1	0001_01_01_000000_create_users_table	1
2	0001_01_01_000001_create_cache_table	1
3	0001_01_01_000002_create_jobs_table	1
4	2025_10_11_212710_create_categories_table	1
5	2025_10_11_212717_create_products_table	1
6	2025_10_11_212719_create_orders_table	1
7	2025_10_11_212721_create_order_items_table	1
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.order_items (id, order_id, product_id, quantity, price, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.orders (id, user_id, total, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: paiement; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.paiement (id_paiement, id_commande, montant, methode_paiement, statut, date_paiement) FROM stdin;
\.


--
-- Data for Name: panier; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.panier (id_panier, id_commande, id_menu, quantite, prix_unitaire) FROM stdin;
\.


--
-- Data for Name: parrainage; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.parrainage (id_parrainage, id_parrain, id_filleul, date_parrainage, recompense_attribuee) FROM stdin;
\.


--
-- Data for Name: participation_evenement; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.participation_evenement (id_utilisateur, id_evenement, date_participation) FROM stdin;
\.


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.password_reset_tokens (email, token, created_at) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.products (id, name, description, price, category_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: promotion; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.promotion (id_promotion, titre, description, image, date_debut, date_fin, reduction, actif) FROM stdin;
\.


--
-- Data for Name: reclamation; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.reclamation (id_reclamation, id_etudiant, id_commande, description, statut, date_reclamation, reponse) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
EHozwItaroEG0pox4fGzgy98G6C53dcFZdOvYBMh	\N	127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0	YTozOntzOjY6Il90b2tlbiI7czo0MDoibGhGWm1aT2RQZWZ1Zk45YlhlQWVkNHRtT3MzdVI4akpkdG5qQlk4WSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=	1760366816
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: miam; Owner: postgres
--

COPY miam.utilisateur (id_utilisateur, nom, email, mot_de_passe_hash, telephone, localisation, date_inscription, statut_compte, type_utilisateur) FROM stdin;
\.


--
-- Data for Name: administrateur; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.administrateur (id_admin, droits_complets) FROM stdin;
5	t
7	t
13	t
\.


--
-- Data for Name: beneficie_promotion; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.beneficie_promotion (id_etudiant, id_promotion, date_obtention) FROM stdin;
1	1	2025-10-17 05:01:50.456546
2	2	2025-10-17 05:01:50.456546
\.


--
-- Data for Name: cache; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.cache (key, value, expiration) FROM stdin;
\.


--
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.cache_locks (key, owner, expiration) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.categories (id_categorie, nom, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: commande; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.commande (id_commande, id_utilisateur, montant_total, points_utilises, points_gagnes, date_commande, mode_livraison, commentaire) FROM stdin;
1	1	6500.00	20	30	2025-10-17 05:01:50.456546	livraison	Livraison rapide svp
2	2	4800.00	0	20	2025-10-17 05:01:50.456546	sur place	Service nickel
\.


--
-- Data for Name: employe; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.employe (id_employe, poste, date_embauche) FROM stdin;
3	Serveur	2024-01-05
8	Serveur	2025-10-17
15	Serveur	2025-10-17
\.


--
-- Data for Name: etudiant; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.etudiant (id_etudiant, points_fidelite, code_parrainage, id_parrain) FROM stdin;
1	120	P001	\N
2	50	P002	\N
9	0	P009	\N
14	0	P014	\N
\.


--
-- Data for Name: evenement; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.evenement (id_evenement, titre, description, image, date_debut, date_fin, points_offerts) FROM stdin;
1	Soirée Étudiante	Ambiance campus	\N	2025-10-01 18:00:00	2025-10-01 23:00:00	30
2	Déjeuner Spécial	Menu à moitié prix pour étudiants	\N	2025-10-05 12:00:00	2025-10-05 15:00:00	20
\.


--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- Data for Name: gerant; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.gerant (id_gerant, niveau_acces) FROM stdin;
4	superviseur
6	standard
10	standard
11	standard
12	standard
\.


--
-- Data for Name: historique_points; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.historique_points (id_historique, id_etudiant, points_gagnes, points_utilises, description, date_operation) FROM stdin;
1	1	30	0	Commande #1	2025-10-17 05:01:50.456546
2	2	20	0	Commande #2	2025-10-17 05:01:50.456546
\.


--
-- Data for Name: job_batches; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- Data for Name: menu; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.menu (id_menu, nom_plat, description, prix, categorie, image, disponible, date_ajout, id_gerant, created_at, updated_at) FROM stdin;
1	Burger Classique	Pain, viande, salade, tomate	2500.00	Fast food	\N	t	2025-10-17 05:01:50.456546	\N	\N	\N
2	Pizza Royale	Pizza avec jambon et fromage	3500.00	Plat principal	\N	t	2025-10-17 05:01:50.456546	\N	\N	\N
3	Poulet Braisé	Poulet grillé avec plantains	4000.00	Spécialité	\N	t	2025-10-17 05:01:50.456546	\N	\N	\N
4	Boisson gazeuse	Coca, Fanta, Sprite	800.00	Boisson	\N	t	2025-10-17 05:01:50.456546	\N	\N	\N
5	Pizza Royale	Pizza garnie de jambon, champignons et fromage fondant	4500.00	plat	pizza_royale.jpg	t	2025-10-17 10:43:58.472071	11	2025-10-17 09:43:58	2025-10-17 09:43:58
6	Pizza Royale	Pizza garnie de jambon, champignons et fromage fondant	4500.00	plat	pizza_royale.jpg	t	2025-10-17 10:45:38.62239	11	2025-10-17 09:45:38	2025-10-17 09:45:38
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.migrations (id, migration, batch) FROM stdin;
1	0001_01_01_000000_create_users_table	1
2	0001_01_01_000001_create_cache_table	1
3	0001_01_01_000002_create_jobs_table	1
4	2025_10_11_212710_create_categories_table	1
\.


--
-- Data for Name: paiement; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.paiement (id_paiement, id_commande, montant, methode_paiement, statut, date_paiement) FROM stdin;
1	1	6500.00	mobile_money	effectue	2025-10-17 05:01:50.456546
2	2	4800.00	carte	en_attente	2025-10-17 05:01:50.456546
\.


--
-- Data for Name: panier; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.panier (id_panier, id_commande, id_menu, quantite, prix_unitaire) FROM stdin;
1	1	1	2	2500.00
2	1	4	1	800.00
3	2	2	1	3500.00
4	2	4	2	800.00
\.


--
-- Data for Name: parrainage; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.parrainage (id_parrainage, id_parrain, id_filleul, date_parrainage, recompense_attribuee) FROM stdin;
1	1	2	2025-10-17	f
\.


--
-- Data for Name: participation_evenement; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.participation_evenement (id_utilisateur, id_evenement, date_participation) FROM stdin;
1	1	2025-10-17 05:01:50.456546
2	2	2025-10-17 05:01:50.456546
\.


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.password_reset_tokens (email, token, created_at) FROM stdin;
\.


--
-- Data for Name: promotion; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.promotion (id_promotion, titre, description, image, date_debut, date_fin, reduction, actif) FROM stdin;
1	Promo Été	10% sur les plats chauds	\N	2025-06-01	2025-08-31	10.00	t
2	Happy Hour	2 pour 1 sur les boissons	\N	2025-09-01	2025-09-30	50.00	t
\.


--
-- Data for Name: reclamation; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.reclamation (id_reclamation, id_etudiant, id_commande, description, statut, date_reclamation, reponse) FROM stdin;
1	1	1	Commande arrivée froide	ouverte	2025-10-17 05:01:50.456546	\N
2	2	2	Oubli de boisson dans le sac	ouverte	2025-10-17 05:01:50.456546	\N
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: mm; Owner: postgres
--

COPY mm.utilisateur (id_utilisateur, nom, email, mot_de_passe_hash, telephone, localisation, date_inscription, statut_compte, type_utilisateur) FROM stdin;
1	Pharel	pharel@example.com	hashedpwd1	699000001	\N	2025-10-17 05:01:50.456546	actif	etudiant
2	Linda	linda@example.com	hashedpwd2	699000002	\N	2025-10-17 05:01:50.456546	actif	etudiant
3	Martin	martin@example.com	hashedpwd3	699000003	\N	2025-10-17 05:01:50.456546	actif	employe
4	Beau JO	beaujo@example.com	hashedpwd4	699000004	\N	2025-10-17 05:01:50.456546	actif	gerant
5	Admin	admin@example.com	hashedpwd5	699000005	\N	2025-10-17 05:01:50.456546	actif	administrateur
6	Jean Chef	chefy@example.com	$2y$12$TLq/Z/LMeTCLU04lQczsHO9ytIoeZXPHC0Wy/a2fyLW2D9kfYomvy	\N	\N	2025-10-17 07:59:06	actif	gerant
7	Jean Chef	chefyy@example.com	$2y$12$k6y0GJIa32yithYRR6byMO7UOmpoWe8vOyWHUJesBMWGWDzf07IBq	\N	\N	2025-10-17 08:40:47	actif	administrateur
8	Jean Chef	chefyyy@example.com	$2y$12$MEex/oXYpbAM4DNFZpExcO6BDPvfBySk6QwCZ9M1IF/xTu9ssj7Sq	\N	\N	2025-10-17 08:42:56	actif	employe
9	Jean Chef	chefyyyy@example.com	$2y$12$KkpUbgIYt.Vc7jYDRQeqVOp0oIeMtEkIfTLXNCSOqVNppYr71lT/G	\N	\N	2025-10-17 08:45:18	actif	etudiant
10	Jean Chef	chefyyyyy@example.com	$2y$12$fHkqcmxztSYAKpjhcnPKc.kto8WmtZb59vNx6LaCcr7Zyh3YFqPua	\N	\N	2025-10-17 08:46:33	actif	gerant
11	Jean Chef	cheffffff@example.com	$2y$12$sK0uQH/PT9FFS1hhTgeBWOFmZ7KBZ2B0JR99iyB3xgiV5bP.sE8fO	\N	\N	2025-10-17 09:37:35	actif	gerant
12	Jean Chef	chet@example.com	$2y$12$NlCVPrMYXz730h91p.53G.M5aYUBJW8HnrRipkAG6IdqSiWbvAJ/2	\N	\N	2025-10-17 10:02:55	actif	gerant
13	Jean Chef	chett@example.com	$2y$12$UWnFDls.23Tn7yxlfdMGTu9wXO0HPsndqdLdIWRSZXC3qDQYoL12m	\N	\N	2025-10-17 10:03:30	actif	administrateur
14	Jean Chef	chefx@example.com	$2y$12$bzSCNxDqmsdr2GwMS2qC8e69.9nHuNdg3B.Bh3AAPcWyBNr938KL2	\N	\N	2025-10-17 10:07:18	actif	etudiant
15	Jean Chef	chef@example.com	$2y$12$BwA6angrPkk.TfYEQ3UjruhYXgS27JNfmYOV9aRGtPR9wjC8JT5Xy	\N	\N	2025-10-17 10:10:05	actif	employe
\.


--
-- Data for Name: administrateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.administrateur (id_admin, droits_complets) FROM stdin;
5	t
\.


--
-- Data for Name: beneficie_promotion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.beneficie_promotion (id_etudiant, id_promotion, date_obtention) FROM stdin;
1	1	2025-10-17 11:29:58.944183
2	2	2025-10-17 11:29:58.944183
\.


--
-- Data for Name: commande; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.commande (id_commande, id_utilisateur, montant_total, points_utilises, points_gagnes, date_commande, mode_livraison, commentaire) FROM stdin;
1	1	6500.00	20	30	2025-10-17 11:29:58.944183	livraison	Livraison rapide svp
2	2	4800.00	0	20	2025-10-17 11:29:58.944183	sur place	Service nickel
\.


--
-- Data for Name: employe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employe (id_employe, poste, date_embauche) FROM stdin;
3	Serveur	2024-01-05
\.


--
-- Data for Name: etudiant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.etudiant (id_etudiant, points_fidelite, code_parrainage, id_parrain) FROM stdin;
1	120	P001	\N
2	50	P002	\N
\.


--
-- Data for Name: evenement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evenement (id_evenement, titre, description, image, date_debut, date_fin, points_offerts) FROM stdin;
1	Soirée Étudiante	Ambiance campus	\N	2025-10-01 18:00:00	2025-10-01 23:00:00	30
2	Déjeuner Spécial	Menu à moitié prix pour étudiants	\N	2025-10-05 12:00:00	2025-10-05 15:00:00	20
\.


--
-- Data for Name: gerant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gerant (id_gerant, niveau_acces) FROM stdin;
4	superviseur
\.


--
-- Data for Name: historique_points; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historique_points (id_historique, id_etudiant, points_gagnes, points_utilises, description, date_operation) FROM stdin;
1	1	30	0	Commande #1	2025-10-17 11:29:58.944183
2	2	20	0	Commande #2	2025-10-17 11:29:58.944183
\.


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menu (id_menu, nom_plat, description, prix, categorie, image, disponible, date_ajout, id_gerant) FROM stdin;
1	Burger Classique	Pain, viande, salade, tomate	2500.00	Fast food	burger.jpg	t	2025-10-17 11:29:58.944183	4
2	Pizza Royale	Pizza avec jambon et fromage	3500.00	Plat principal	pizza.jpg	t	2025-10-17 11:29:58.944183	4
3	Poulet Braisé	Poulet grillé avec plantains	4000.00	Spécialité	poulet.jpg	t	2025-10-17 11:29:58.944183	4
4	Boisson gazeuse	Coca, Fanta, Sprite	800.00	Boisson	boisson.jpg	t	2025-10-17 11:29:58.944183	4
5	Menu Royal	Entrée + Plat + Dessert	6500.00	Plat complet	menu_royal.jpg	t	2025-10-17 11:29:58.944183	4
\.


--
-- Data for Name: paiement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.paiement (id_paiement, id_commande, montant, methode_paiement, statut, date_paiement) FROM stdin;
1	1	6500.00	mobile_money	effectue	2025-10-17 11:29:58.944183
2	2	4800.00	carte	en_attente	2025-10-17 11:29:58.944183
\.


--
-- Data for Name: panier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.panier (id_panier, id_commande, id_menu, quantite, prix_unitaire) FROM stdin;
1	1	1	2	2500.00
2	1	4	1	800.00
3	2	2	1	3500.00
4	2	4	2	800.00
\.


--
-- Data for Name: parrainage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parrainage (id_parrainage, id_parrain, id_filleul, date_parrainage, recompense_attribuee) FROM stdin;
1	1	2	2025-10-17	f
\.


--
-- Data for Name: participation_evenement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.participation_evenement (id_utilisateur, id_evenement, date_participation) FROM stdin;
1	1	2025-10-17 11:29:58.944183
2	2	2025-10-17 11:29:58.944183
\.


--
-- Data for Name: promotion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.promotion (id_promotion, titre, description, image, date_debut, date_fin, reduction, actif) FROM stdin;
1	Promo Été	10% sur les plats chauds	\N	2025-06-01	2025-08-31	10.00	t
2	Happy Hour	2 pour 1 sur les boissons	\N	2025-09-01	2025-09-30	50.00	t
\.


--
-- Data for Name: reclamation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reclamation (id_reclamation, id_etudiant, id_commande, description, statut, date_reclamation, reponse) FROM stdin;
1	1	1	Commande arrivée froide	ouverte	2025-10-17 11:29:58.944183	\N
2	2	2	Oubli de boisson dans le sac	ouverte	2025-10-17 11:29:58.944183	\N
\.


--
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilisateur (id_utilisateur, nom, email, mot_de_passe_hash, telephone, localisation, date_inscription, statut_compte, type_utilisateur) FROM stdin;
1	Pharel	pharel@example.com	hashedpwd1	699000001	\N	2025-10-17 11:29:58.944183	actif	etudiant
2	Linda	linda@example.com	hashedpwd2	699000002	\N	2025-10-17 11:29:58.944183	actif	etudiant
3	Martin	martin@example.com	hashedpwd3	699000003	\N	2025-10-17 11:29:58.944183	actif	employe
4	Beau JO	beaujo@example.com	hashedpwd4	699000004	\N	2025-10-17 11:29:58.944183	actif	gerant
5	Admin	admin@example.com	hashedpwd5	699000005	\N	2025-10-17 11:29:58.944183	actif	administrateur
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.categories_id_seq', 1, false);


--
-- Name: commande_id_commande_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.commande_id_commande_seq', 1, false);


--
-- Name: evenement_id_evenement_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.evenement_id_evenement_seq', 1, false);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.failed_jobs_id_seq', 1, false);


--
-- Name: historique_points_id_historique_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.historique_points_id_historique_seq', 1, false);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.jobs_id_seq', 1, false);


--
-- Name: menu_id_menu_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.menu_id_menu_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.migrations_id_seq', 7, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.order_items_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.orders_id_seq', 1, false);


--
-- Name: paiement_id_paiement_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.paiement_id_paiement_seq', 1, false);


--
-- Name: panier_id_panier_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.panier_id_panier_seq', 1, false);


--
-- Name: parrainage_id_parrainage_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.parrainage_id_parrainage_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.products_id_seq', 1, false);


--
-- Name: promotion_id_promotion_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.promotion_id_promotion_seq', 1, false);


--
-- Name: reclamation_id_reclamation_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.reclamation_id_reclamation_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.users_id_seq', 1, false);


--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE SET; Schema: miam; Owner: postgres
--

SELECT pg_catalog.setval('miam.utilisateur_id_utilisateur_seq', 1, false);


--
-- Name: categories_id_categorie_seq; Type: SEQUENCE SET; Schema: mm; Owner: postgres
--

SELECT pg_catalog.setval('mm.categories_id_categorie_seq', 1, false);


--
-- Name: commande_id_commande_seq; Type: SEQUENCE SET; Schema: mm; Owner: postgres
--

SELECT pg_catalog.setval('mm.commande_id_commande_seq', 2, true);


--
-- Name: evenement_id_evenement_seq; Type: SEQUENCE SET; Schema: mm; Owner: postgres
--

SELECT pg_catalog.setval('mm.evenement_id_evenement_seq', 2, true);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: mm; Owner: postgres
--

SELECT pg_catalog.setval('mm.failed_jobs_id_seq', 1, false);


--
-- Name: historique_points_id_historique_seq; Type: SEQUENCE SET; Schema: mm; Owner: postgres
--

SELECT pg_catalog.setval('mm.historique_points_id_historique_seq', 2, true);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: mm; Owner: postgres
--

SELECT pg_catalog.setval('mm.jobs_id_seq', 1, false);


--
-- Name: menu_id_menu_seq; Type: SEQUENCE SET; Schema: mm; Owner: postgres
--

SELECT pg_catalog.setval('mm.menu_id_menu_seq', 7, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: mm; Owner: postgres
--

SELECT pg_catalog.setval('mm.migrations_id_seq', 4, true);


--
-- Name: paiement_id_paiement_seq; Type: SEQUENCE SET; Schema: mm; Owner: postgres
--

SELECT pg_catalog.setval('mm.paiement_id_paiement_seq', 2, true);


--
-- Name: panier_id_panier_seq; Type: SEQUENCE SET; Schema: mm; Owner: postgres
--

SELECT pg_catalog.setval('mm.panier_id_panier_seq', 4, true);


--
-- Name: parrainage_id_parrainage_seq; Type: SEQUENCE SET; Schema: mm; Owner: postgres
--

SELECT pg_catalog.setval('mm.parrainage_id_parrainage_seq', 1, true);


--
-- Name: promotion_id_promotion_seq; Type: SEQUENCE SET; Schema: mm; Owner: postgres
--

SELECT pg_catalog.setval('mm.promotion_id_promotion_seq', 2, true);


--
-- Name: reclamation_id_reclamation_seq; Type: SEQUENCE SET; Schema: mm; Owner: postgres
--

SELECT pg_catalog.setval('mm.reclamation_id_reclamation_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: mm; Owner: postgres
--

SELECT pg_catalog.setval('mm.users_id_seq', 1, false);


--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE SET; Schema: mm; Owner: postgres
--

SELECT pg_catalog.setval('mm.utilisateur_id_utilisateur_seq', 15, true);


--
-- Name: commande_id_commande_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.commande_id_commande_seq', 2, true);


--
-- Name: evenement_id_evenement_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evenement_id_evenement_seq', 2, true);


--
-- Name: historique_points_id_historique_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historique_points_id_historique_seq', 2, true);


--
-- Name: menu_id_menu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_id_menu_seq', 5, true);


--
-- Name: paiement_id_paiement_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.paiement_id_paiement_seq', 2, true);


--
-- Name: panier_id_panier_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.panier_id_panier_seq', 4, true);


--
-- Name: parrainage_id_parrainage_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parrainage_id_parrainage_seq', 1, true);


--
-- Name: promotion_id_promotion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.promotion_id_promotion_seq', 2, true);


--
-- Name: reclamation_id_reclamation_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reclamation_id_reclamation_seq', 2, true);


--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utilisateur_id_utilisateur_seq', 5, true);


--
-- Name: administrateur administrateur_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.administrateur
    ADD CONSTRAINT administrateur_pkey PRIMARY KEY (id_admin);


--
-- Name: beneficie_promotion beneficie_promotion_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.beneficie_promotion
    ADD CONSTRAINT beneficie_promotion_pkey PRIMARY KEY (id_etudiant, id_promotion);


--
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: commande commande_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.commande
    ADD CONSTRAINT commande_pkey PRIMARY KEY (id_commande);


--
-- Name: employe employe_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.employe
    ADD CONSTRAINT employe_pkey PRIMARY KEY (id_employe);


--
-- Name: etudiant etudiant_code_parrainage_key; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.etudiant
    ADD CONSTRAINT etudiant_code_parrainage_key UNIQUE (code_parrainage);


--
-- Name: etudiant etudiant_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.etudiant
    ADD CONSTRAINT etudiant_pkey PRIMARY KEY (id_etudiant);


--
-- Name: evenement evenement_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.evenement
    ADD CONSTRAINT evenement_pkey PRIMARY KEY (id_evenement);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: gerant gerant_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.gerant
    ADD CONSTRAINT gerant_pkey PRIMARY KEY (id_gerant);


--
-- Name: historique_points historique_points_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.historique_points
    ADD CONSTRAINT historique_points_pkey PRIMARY KEY (id_historique);


--
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id_menu);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: paiement paiement_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.paiement
    ADD CONSTRAINT paiement_pkey PRIMARY KEY (id_paiement);


--
-- Name: panier panier_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.panier
    ADD CONSTRAINT panier_pkey PRIMARY KEY (id_panier);


--
-- Name: parrainage parrainage_id_parrain_id_filleul_key; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.parrainage
    ADD CONSTRAINT parrainage_id_parrain_id_filleul_key UNIQUE (id_parrain, id_filleul);


--
-- Name: parrainage parrainage_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.parrainage
    ADD CONSTRAINT parrainage_pkey PRIMARY KEY (id_parrainage);


--
-- Name: participation_evenement participation_evenement_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.participation_evenement
    ADD CONSTRAINT participation_evenement_pkey PRIMARY KEY (id_utilisateur, id_evenement);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: promotion promotion_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.promotion
    ADD CONSTRAINT promotion_pkey PRIMARY KEY (id_promotion);


--
-- Name: reclamation reclamation_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.reclamation
    ADD CONSTRAINT reclamation_pkey PRIMARY KEY (id_reclamation);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: utilisateur utilisateur_email_key; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.utilisateur
    ADD CONSTRAINT utilisateur_email_key UNIQUE (email);


--
-- Name: utilisateur utilisateur_pkey; Type: CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id_utilisateur);


--
-- Name: administrateur administrateur_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.administrateur
    ADD CONSTRAINT administrateur_pkey PRIMARY KEY (id_admin);


--
-- Name: beneficie_promotion beneficie_promotion_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.beneficie_promotion
    ADD CONSTRAINT beneficie_promotion_pkey PRIMARY KEY (id_etudiant, id_promotion);


--
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id_categorie);


--
-- Name: commande commande_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.commande
    ADD CONSTRAINT commande_pkey PRIMARY KEY (id_commande);


--
-- Name: employe employe_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.employe
    ADD CONSTRAINT employe_pkey PRIMARY KEY (id_employe);


--
-- Name: etudiant etudiant_code_parrainage_key; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.etudiant
    ADD CONSTRAINT etudiant_code_parrainage_key UNIQUE (code_parrainage);


--
-- Name: etudiant etudiant_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.etudiant
    ADD CONSTRAINT etudiant_pkey PRIMARY KEY (id_etudiant);


--
-- Name: evenement evenement_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.evenement
    ADD CONSTRAINT evenement_pkey PRIMARY KEY (id_evenement);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: gerant gerant_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.gerant
    ADD CONSTRAINT gerant_pkey PRIMARY KEY (id_gerant);


--
-- Name: historique_points historique_points_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.historique_points
    ADD CONSTRAINT historique_points_pkey PRIMARY KEY (id_historique);


--
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id_menu);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: paiement paiement_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.paiement
    ADD CONSTRAINT paiement_pkey PRIMARY KEY (id_paiement);


--
-- Name: panier panier_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.panier
    ADD CONSTRAINT panier_pkey PRIMARY KEY (id_panier);


--
-- Name: parrainage parrainage_id_parrain_id_filleul_key; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.parrainage
    ADD CONSTRAINT parrainage_id_parrain_id_filleul_key UNIQUE (id_parrain, id_filleul);


--
-- Name: parrainage parrainage_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.parrainage
    ADD CONSTRAINT parrainage_pkey PRIMARY KEY (id_parrainage);


--
-- Name: participation_evenement participation_evenement_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.participation_evenement
    ADD CONSTRAINT participation_evenement_pkey PRIMARY KEY (id_utilisateur, id_evenement);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- Name: promotion promotion_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.promotion
    ADD CONSTRAINT promotion_pkey PRIMARY KEY (id_promotion);


--
-- Name: reclamation reclamation_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.reclamation
    ADD CONSTRAINT reclamation_pkey PRIMARY KEY (id_reclamation);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: utilisateur utilisateur_email_key; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.utilisateur
    ADD CONSTRAINT utilisateur_email_key UNIQUE (email);


--
-- Name: utilisateur utilisateur_pkey; Type: CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id_utilisateur);


--
-- Name: administrateur administrateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrateur
    ADD CONSTRAINT administrateur_pkey PRIMARY KEY (id_admin);


--
-- Name: beneficie_promotion beneficie_promotion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beneficie_promotion
    ADD CONSTRAINT beneficie_promotion_pkey PRIMARY KEY (id_etudiant, id_promotion);


--
-- Name: commande commande_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commande
    ADD CONSTRAINT commande_pkey PRIMARY KEY (id_commande);


--
-- Name: employe employe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employe
    ADD CONSTRAINT employe_pkey PRIMARY KEY (id_employe);


--
-- Name: etudiant etudiant_code_parrainage_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etudiant
    ADD CONSTRAINT etudiant_code_parrainage_key UNIQUE (code_parrainage);


--
-- Name: etudiant etudiant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etudiant
    ADD CONSTRAINT etudiant_pkey PRIMARY KEY (id_etudiant);


--
-- Name: evenement evenement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evenement
    ADD CONSTRAINT evenement_pkey PRIMARY KEY (id_evenement);


--
-- Name: gerant gerant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gerant
    ADD CONSTRAINT gerant_pkey PRIMARY KEY (id_gerant);


--
-- Name: historique_points historique_points_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historique_points
    ADD CONSTRAINT historique_points_pkey PRIMARY KEY (id_historique);


--
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id_menu);


--
-- Name: paiement paiement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiement
    ADD CONSTRAINT paiement_pkey PRIMARY KEY (id_paiement);


--
-- Name: panier panier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.panier
    ADD CONSTRAINT panier_pkey PRIMARY KEY (id_panier);


--
-- Name: parrainage parrainage_id_parrain_id_filleul_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parrainage
    ADD CONSTRAINT parrainage_id_parrain_id_filleul_key UNIQUE (id_parrain, id_filleul);


--
-- Name: parrainage parrainage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parrainage
    ADD CONSTRAINT parrainage_pkey PRIMARY KEY (id_parrainage);


--
-- Name: participation_evenement participation_evenement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participation_evenement
    ADD CONSTRAINT participation_evenement_pkey PRIMARY KEY (id_utilisateur, id_evenement);


--
-- Name: promotion promotion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotion
    ADD CONSTRAINT promotion_pkey PRIMARY KEY (id_promotion);


--
-- Name: reclamation reclamation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reclamation
    ADD CONSTRAINT reclamation_pkey PRIMARY KEY (id_reclamation);


--
-- Name: utilisateur utilisateur_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_email_key UNIQUE (email);


--
-- Name: utilisateur utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id_utilisateur);


--
-- Name: jobs_queue_index; Type: INDEX; Schema: miam; Owner: postgres
--

CREATE INDEX jobs_queue_index ON miam.jobs USING btree (queue);


--
-- Name: sessions_last_activity_index; Type: INDEX; Schema: miam; Owner: postgres
--

CREATE INDEX sessions_last_activity_index ON miam.sessions USING btree (last_activity);


--
-- Name: sessions_user_id_index; Type: INDEX; Schema: miam; Owner: postgres
--

CREATE INDEX sessions_user_id_index ON miam.sessions USING btree (user_id);


--
-- Name: jobs_queue_index; Type: INDEX; Schema: mm; Owner: postgres
--

CREATE INDEX jobs_queue_index ON mm.jobs USING btree (queue);


--
-- Name: sessions_last_activity_index; Type: INDEX; Schema: mm; Owner: postgres
--

CREATE INDEX sessions_last_activity_index ON mm.sessions USING btree (last_activity);


--
-- Name: sessions_user_id_index; Type: INDEX; Schema: mm; Owner: postgres
--

CREATE INDEX sessions_user_id_index ON mm.sessions USING btree (user_id);


--
-- Name: administrateur administrateur_id_admin_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.administrateur
    ADD CONSTRAINT administrateur_id_admin_fkey FOREIGN KEY (id_admin) REFERENCES miam.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: beneficie_promotion beneficie_promotion_id_etudiant_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.beneficie_promotion
    ADD CONSTRAINT beneficie_promotion_id_etudiant_fkey FOREIGN KEY (id_etudiant) REFERENCES miam.etudiant(id_etudiant) ON DELETE CASCADE;


--
-- Name: beneficie_promotion beneficie_promotion_id_promotion_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.beneficie_promotion
    ADD CONSTRAINT beneficie_promotion_id_promotion_fkey FOREIGN KEY (id_promotion) REFERENCES miam.promotion(id_promotion) ON DELETE CASCADE;


--
-- Name: commande commande_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.commande
    ADD CONSTRAINT commande_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES miam.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: employe employe_id_employe_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.employe
    ADD CONSTRAINT employe_id_employe_fkey FOREIGN KEY (id_employe) REFERENCES miam.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: etudiant etudiant_id_etudiant_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.etudiant
    ADD CONSTRAINT etudiant_id_etudiant_fkey FOREIGN KEY (id_etudiant) REFERENCES miam.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: etudiant etudiant_id_parrain_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.etudiant
    ADD CONSTRAINT etudiant_id_parrain_fkey FOREIGN KEY (id_parrain) REFERENCES miam.etudiant(id_etudiant) ON DELETE SET NULL;


--
-- Name: gerant gerant_id_gerant_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.gerant
    ADD CONSTRAINT gerant_id_gerant_fkey FOREIGN KEY (id_gerant) REFERENCES miam.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: historique_points historique_points_id_etudiant_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.historique_points
    ADD CONSTRAINT historique_points_id_etudiant_fkey FOREIGN KEY (id_etudiant) REFERENCES miam.etudiant(id_etudiant) ON DELETE CASCADE;


--
-- Name: order_items order_items_order_id_foreign; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.order_items
    ADD CONSTRAINT order_items_order_id_foreign FOREIGN KEY (order_id) REFERENCES miam.orders(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_product_id_foreign; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.order_items
    ADD CONSTRAINT order_items_product_id_foreign FOREIGN KEY (product_id) REFERENCES miam.products(id) ON DELETE CASCADE;


--
-- Name: orders orders_user_id_foreign; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.orders
    ADD CONSTRAINT orders_user_id_foreign FOREIGN KEY (user_id) REFERENCES miam.users(id) ON DELETE CASCADE;


--
-- Name: paiement paiement_id_commande_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.paiement
    ADD CONSTRAINT paiement_id_commande_fkey FOREIGN KEY (id_commande) REFERENCES miam.commande(id_commande) ON DELETE CASCADE;


--
-- Name: panier panier_id_commande_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.panier
    ADD CONSTRAINT panier_id_commande_fkey FOREIGN KEY (id_commande) REFERENCES miam.commande(id_commande) ON DELETE CASCADE;


--
-- Name: panier panier_id_menu_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.panier
    ADD CONSTRAINT panier_id_menu_fkey FOREIGN KEY (id_menu) REFERENCES miam.menu(id_menu) ON DELETE RESTRICT;


--
-- Name: parrainage parrainage_id_filleul_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.parrainage
    ADD CONSTRAINT parrainage_id_filleul_fkey FOREIGN KEY (id_filleul) REFERENCES miam.etudiant(id_etudiant) ON DELETE CASCADE;


--
-- Name: parrainage parrainage_id_parrain_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.parrainage
    ADD CONSTRAINT parrainage_id_parrain_fkey FOREIGN KEY (id_parrain) REFERENCES miam.etudiant(id_etudiant) ON DELETE CASCADE;


--
-- Name: participation_evenement participation_evenement_id_evenement_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.participation_evenement
    ADD CONSTRAINT participation_evenement_id_evenement_fkey FOREIGN KEY (id_evenement) REFERENCES miam.evenement(id_evenement) ON DELETE CASCADE;


--
-- Name: participation_evenement participation_evenement_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.participation_evenement
    ADD CONSTRAINT participation_evenement_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES miam.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: products products_category_id_foreign; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.products
    ADD CONSTRAINT products_category_id_foreign FOREIGN KEY (category_id) REFERENCES miam.categories(id) ON DELETE CASCADE;


--
-- Name: reclamation reclamation_id_commande_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.reclamation
    ADD CONSTRAINT reclamation_id_commande_fkey FOREIGN KEY (id_commande) REFERENCES miam.commande(id_commande) ON DELETE SET NULL;


--
-- Name: reclamation reclamation_id_etudiant_fkey; Type: FK CONSTRAINT; Schema: miam; Owner: postgres
--

ALTER TABLE ONLY miam.reclamation
    ADD CONSTRAINT reclamation_id_etudiant_fkey FOREIGN KEY (id_etudiant) REFERENCES miam.etudiant(id_etudiant) ON DELETE CASCADE;


--
-- Name: administrateur administrateur_id_admin_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.administrateur
    ADD CONSTRAINT administrateur_id_admin_fkey FOREIGN KEY (id_admin) REFERENCES mm.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: beneficie_promotion beneficie_promotion_id_etudiant_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.beneficie_promotion
    ADD CONSTRAINT beneficie_promotion_id_etudiant_fkey FOREIGN KEY (id_etudiant) REFERENCES mm.etudiant(id_etudiant) ON DELETE CASCADE;


--
-- Name: beneficie_promotion beneficie_promotion_id_promotion_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.beneficie_promotion
    ADD CONSTRAINT beneficie_promotion_id_promotion_fkey FOREIGN KEY (id_promotion) REFERENCES mm.promotion(id_promotion) ON DELETE CASCADE;


--
-- Name: commande commande_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.commande
    ADD CONSTRAINT commande_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES mm.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: employe employe_id_employe_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.employe
    ADD CONSTRAINT employe_id_employe_fkey FOREIGN KEY (id_employe) REFERENCES mm.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: etudiant etudiant_id_etudiant_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.etudiant
    ADD CONSTRAINT etudiant_id_etudiant_fkey FOREIGN KEY (id_etudiant) REFERENCES mm.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: etudiant etudiant_id_parrain_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.etudiant
    ADD CONSTRAINT etudiant_id_parrain_fkey FOREIGN KEY (id_parrain) REFERENCES mm.etudiant(id_etudiant) ON DELETE SET NULL;


--
-- Name: gerant gerant_id_gerant_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.gerant
    ADD CONSTRAINT gerant_id_gerant_fkey FOREIGN KEY (id_gerant) REFERENCES mm.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: historique_points historique_points_id_etudiant_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.historique_points
    ADD CONSTRAINT historique_points_id_etudiant_fkey FOREIGN KEY (id_etudiant) REFERENCES mm.etudiant(id_etudiant) ON DELETE CASCADE;


--
-- Name: menu menu_id_gerant_foreign; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.menu
    ADD CONSTRAINT menu_id_gerant_foreign FOREIGN KEY (id_gerant) REFERENCES mm.utilisateur(id_utilisateur) ON DELETE SET NULL;


--
-- Name: paiement paiement_id_commande_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.paiement
    ADD CONSTRAINT paiement_id_commande_fkey FOREIGN KEY (id_commande) REFERENCES mm.commande(id_commande) ON DELETE CASCADE;


--
-- Name: panier panier_id_commande_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.panier
    ADD CONSTRAINT panier_id_commande_fkey FOREIGN KEY (id_commande) REFERENCES mm.commande(id_commande) ON DELETE CASCADE;


--
-- Name: panier panier_id_menu_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.panier
    ADD CONSTRAINT panier_id_menu_fkey FOREIGN KEY (id_menu) REFERENCES mm.menu(id_menu) ON DELETE RESTRICT;


--
-- Name: parrainage parrainage_id_filleul_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.parrainage
    ADD CONSTRAINT parrainage_id_filleul_fkey FOREIGN KEY (id_filleul) REFERENCES mm.etudiant(id_etudiant) ON DELETE CASCADE;


--
-- Name: parrainage parrainage_id_parrain_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.parrainage
    ADD CONSTRAINT parrainage_id_parrain_fkey FOREIGN KEY (id_parrain) REFERENCES mm.etudiant(id_etudiant) ON DELETE CASCADE;


--
-- Name: participation_evenement participation_evenement_id_evenement_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.participation_evenement
    ADD CONSTRAINT participation_evenement_id_evenement_fkey FOREIGN KEY (id_evenement) REFERENCES mm.evenement(id_evenement) ON DELETE CASCADE;


--
-- Name: participation_evenement participation_evenement_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.participation_evenement
    ADD CONSTRAINT participation_evenement_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES mm.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: reclamation reclamation_id_commande_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.reclamation
    ADD CONSTRAINT reclamation_id_commande_fkey FOREIGN KEY (id_commande) REFERENCES mm.commande(id_commande) ON DELETE SET NULL;


--
-- Name: reclamation reclamation_id_etudiant_fkey; Type: FK CONSTRAINT; Schema: mm; Owner: postgres
--

ALTER TABLE ONLY mm.reclamation
    ADD CONSTRAINT reclamation_id_etudiant_fkey FOREIGN KEY (id_etudiant) REFERENCES mm.etudiant(id_etudiant) ON DELETE CASCADE;


--
-- Name: administrateur administrateur_id_admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrateur
    ADD CONSTRAINT administrateur_id_admin_fkey FOREIGN KEY (id_admin) REFERENCES public.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: beneficie_promotion beneficie_promotion_id_etudiant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beneficie_promotion
    ADD CONSTRAINT beneficie_promotion_id_etudiant_fkey FOREIGN KEY (id_etudiant) REFERENCES public.etudiant(id_etudiant) ON DELETE CASCADE;


--
-- Name: beneficie_promotion beneficie_promotion_id_promotion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beneficie_promotion
    ADD CONSTRAINT beneficie_promotion_id_promotion_fkey FOREIGN KEY (id_promotion) REFERENCES public.promotion(id_promotion) ON DELETE CASCADE;


--
-- Name: commande commande_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commande
    ADD CONSTRAINT commande_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: employe employe_id_employe_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employe
    ADD CONSTRAINT employe_id_employe_fkey FOREIGN KEY (id_employe) REFERENCES public.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: etudiant etudiant_id_etudiant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etudiant
    ADD CONSTRAINT etudiant_id_etudiant_fkey FOREIGN KEY (id_etudiant) REFERENCES public.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: etudiant etudiant_id_parrain_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etudiant
    ADD CONSTRAINT etudiant_id_parrain_fkey FOREIGN KEY (id_parrain) REFERENCES public.etudiant(id_etudiant) ON DELETE SET NULL;


--
-- Name: gerant gerant_id_gerant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gerant
    ADD CONSTRAINT gerant_id_gerant_fkey FOREIGN KEY (id_gerant) REFERENCES public.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: historique_points historique_points_id_etudiant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historique_points
    ADD CONSTRAINT historique_points_id_etudiant_fkey FOREIGN KEY (id_etudiant) REFERENCES public.etudiant(id_etudiant) ON DELETE CASCADE;


--
-- Name: menu menu_id_gerant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_id_gerant_fkey FOREIGN KEY (id_gerant) REFERENCES public.gerant(id_gerant) ON DELETE SET NULL;


--
-- Name: paiement paiement_id_commande_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiement
    ADD CONSTRAINT paiement_id_commande_fkey FOREIGN KEY (id_commande) REFERENCES public.commande(id_commande) ON DELETE CASCADE;


--
-- Name: panier panier_id_commande_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.panier
    ADD CONSTRAINT panier_id_commande_fkey FOREIGN KEY (id_commande) REFERENCES public.commande(id_commande) ON DELETE CASCADE;


--
-- Name: panier panier_id_menu_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.panier
    ADD CONSTRAINT panier_id_menu_fkey FOREIGN KEY (id_menu) REFERENCES public.menu(id_menu) ON DELETE RESTRICT;


--
-- Name: parrainage parrainage_id_filleul_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parrainage
    ADD CONSTRAINT parrainage_id_filleul_fkey FOREIGN KEY (id_filleul) REFERENCES public.etudiant(id_etudiant) ON DELETE CASCADE;


--
-- Name: parrainage parrainage_id_parrain_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parrainage
    ADD CONSTRAINT parrainage_id_parrain_fkey FOREIGN KEY (id_parrain) REFERENCES public.etudiant(id_etudiant) ON DELETE CASCADE;


--
-- Name: participation_evenement participation_evenement_id_evenement_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participation_evenement
    ADD CONSTRAINT participation_evenement_id_evenement_fkey FOREIGN KEY (id_evenement) REFERENCES public.evenement(id_evenement) ON DELETE CASCADE;


--
-- Name: participation_evenement participation_evenement_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participation_evenement
    ADD CONSTRAINT participation_evenement_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: reclamation reclamation_id_commande_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reclamation
    ADD CONSTRAINT reclamation_id_commande_fkey FOREIGN KEY (id_commande) REFERENCES public.commande(id_commande) ON DELETE SET NULL;


--
-- Name: reclamation reclamation_id_etudiant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reclamation
    ADD CONSTRAINT reclamation_id_etudiant_fkey FOREIGN KEY (id_etudiant) REFERENCES public.etudiant(id_etudiant) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

