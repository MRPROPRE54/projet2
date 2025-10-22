-- ==========================================
-- SCRIPT DE VÉRIFICATION COMPLÈTE
-- Base de données : MM
-- Auteur : Pharel
-- ==========================================

-- ⚙️ Sélection du schéma
SET search_path TO public;

-- ==========================================
-- 1️⃣ Vérifier les tables et le nombre de lignes
-- ==========================================
SELECT
    table_name,
    (xpath('/row/cnt/text()', xml_count))[1]::text::int AS nb_enregistrements
FROM (
    SELECT table_name,
           query_to_xml(format('SELECT count(*) AS cnt FROM %I', table_name), false, true, '') AS xml_count
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
) AS counts
ORDER BY table_name;

-- ==========================================
-- 2️⃣ Vérifier les utilisateurs et leurs rôles
-- ==========================================
SELECT id_utilisateur, nom, email, type_utilisateur, statut_compte
FROM utilisateur
ORDER BY id_utilisateur;

-- ==========================================
-- 3️⃣ Étudiants et leur fidélité
-- ==========================================
SELECT e.id_etudiant, u.nom, u.email, e.points_fidelite, e.code_parrainage
FROM etudiant e
JOIN utilisateur u ON u.id_utilisateur = e.id_etudiant
ORDER BY e.id_etudiant;

-- ==========================================
-- 4️⃣ Gérant et ses menus
-- ==========================================
SELECT g.id_gerant, u.nom AS gerant_nom, m.nom_plat, m.prix, m.disponible
FROM gerant g
JOIN utilisateur u ON u.id_utilisateur = g.id_gerant
LEFT JOIN menu m ON m.id_gerant = g.id_gerant
ORDER BY m.id_menu;

-- ==========================================
-- 5️⃣ Commandes + utilisateurs
-- ==========================================
SELECT c.id_commande, u.nom, c.montant_total, c.points_gagnes, c.mode_livraison, c.commentaire
FROM commande c
JOIN utilisateur u ON u.id_utilisateur = c.id_utilisateur
ORDER BY c.id_commande;

-- ==========================================
-- 6️⃣ Détails du panier (commande + menu)
-- ==========================================
SELECT c.id_commande, u.nom AS client, m.nom_plat, p.quantite, p.prix_unitaire,
       (p.quantite * p.prix_unitaire) AS sous_total
FROM panier p
JOIN commande c ON c.id_commande = p.id_commande
JOIN utilisateur u ON u.id_utilisateur = c.id_utilisateur
JOIN menu m ON m.id_menu = p.id_menu
ORDER BY c.id_commande;

-- ==========================================
-- 7️⃣ Vérifier les paiements
-- ==========================================
SELECT p.id_paiement, c.id_commande, u.nom, p.methode_paiement, p.montant, p.statut
FROM paiement p
JOIN commande c ON c.id_commande = p.id_commande
JOIN utilisateur u ON u.id_utilisateur = c.id_utilisateur
ORDER BY p.id_paiement;

-- ==========================================
-- 8️⃣ Vérifier les réclamations
-- ==========================================
SELECT r.id_reclamation, u.nom AS etudiant, r.description, r.statut
FROM reclamation r
JOIN etudiant e ON e.id_etudiant = r.id_etudiant
JOIN utilisateur u ON u.id_utilisateur = e.id_etudiant;

-- ==========================================
-- 9️⃣ Vérifier les points gagnés et utilisés
-- ==========================================
SELECT h.id_historique, u.nom AS etudiant, h.points_gagnes, h.points_utilises, h.description
FROM historique_points h
JOIN etudiant e ON e.id_etudiant = h.id_etudiant
JOIN utilisateur u ON u.id_utilisateur = e.id_etudiant;

-- ==========================================
-- 🔟 Vérifier la participation aux événements
-- ==========================================
SELECT pe.id_utilisateur, u.nom, ev.titre AS evenement, ev.date_debut
FROM participation_evenement pe
JOIN utilisateur u ON u.id_utilisateur = pe.id_utilisateur
JOIN evenement ev ON ev.id_evenement = pe.id_evenement;

-- ==========================================
-- 1️⃣1️⃣ Vérifier les promotions utilisées
-- ==========================================
SELECT bp.id_etudiant, u.nom, pr.titre AS promotion, pr.reduction
FROM beneficie_promotion bp
JOIN etudiant e ON e.id_etudiant = bp.id_etudiant
JOIN utilisateur u ON u.id_utilisateur = e.id_etudiant
JOIN promotion pr ON pr.id_promotion = bp.id_promotion;

-- ==========================================
-- ✅ Résumé global : cohérence commandes / panier / paiements
-- ==========================================
SELECT 
    c.id_commande,
    u.nom AS client,
    SUM(p.quantite * p.prix_unitaire) AS total_panier,
    c.montant_total,
    pa.montant AS montant_paye,
    CASE
        WHEN ROUND(SUM(p.quantite * p.prix_unitaire),2) = c.montant_total THEN 'OK'
        ELSE '⚠️ Incohérent'
    END AS verification
FROM commande c
JOIN utilisateur u ON u.id_utilisateur = c.id_utilisateur
JOIN panier p ON p.id_commande = c.id_commande
LEFT JOIN paiement pa ON pa.id_commande = c.id_commande
GROUP BY c.id_commande, u.nom, c.montant_total, pa.montant
ORDER BY c.id_commande;
