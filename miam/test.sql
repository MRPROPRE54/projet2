-- ==========================================
-- DONNÉES DE TEST POUR LA BASE : MM
-- Auteur : Pharel
-- ==========================================

-- ⚙️ S'assurer qu'on utilise le bon schéma
SET search_path TO public;

-- ==========================================
-- UTILISATEURS
-- ==========================================
INSERT INTO utilisateur (nom, email, mot_de_passe_hash, telephone, type_utilisateur)
VALUES 
('Pharel', 'pharel@example.com', 'hashedpwd1', '699000001', 'etudiant'),
('Linda', 'linda@example.com', 'hashedpwd2', '699000002', 'etudiant'),
('Martin', 'martin@example.com', 'hashedpwd3', '699000003', 'employe'),
('Beau JO', 'beaujo@example.com', 'hashedpwd4', '699000004', 'gerant'),
('Admin', 'admin@example.com', 'hashedpwd5', '699000005', 'administrateur');

-- ==========================================
-- ETUDIANTS
-- ==========================================
INSERT INTO etudiant (id_etudiant, points_fidelite, code_parrainage)
VALUES 
(1, 120, 'P001'), 
(2, 50, 'P002');

-- ==========================================
-- EMPLOYE
-- ==========================================
INSERT INTO employe (id_employe, poste, date_embauche)
VALUES 
(3, 'Serveur', '2024-01-05');

-- ==========================================
-- GERANT
-- ==========================================
INSERT INTO gerant (id_gerant, niveau_acces)
VALUES 
(4, 'superviseur');

-- ==========================================
-- ADMINISTRATEUR
-- ==========================================
INSERT INTO administrateur (id_admin, droits_complets)
VALUES 
(5, TRUE);

-- ==========================================
-- MENUS
-- ==========================================
INSERT INTO menu (nom_plat, description, prix, categorie, image, id_gerant, disponible)
VALUES 
('Burger Classique', 'Pain, viande, salade, tomate', 2500, 'Fast food', 'burger.jpg', 4, TRUE),
('Pizza Royale', 'Pizza avec jambon et fromage', 3500, 'Plat principal', 'pizza.jpg', 4, TRUE),
('Poulet Braisé', 'Poulet grillé avec plantains', 4000, 'Spécialité', 'poulet.jpg', 4, TRUE),
('Boisson gazeuse', 'Coca, Fanta, Sprite', 800, 'Boisson', 'boisson.jpg', 4, TRUE),
('Menu Royal', 'Entrée + Plat + Dessert', 6500, 'Plat complet', 'menu_royal.jpg', 4, TRUE);

-- ==========================================
-- PROMOTIONS
-- ==========================================
INSERT INTO promotion (titre, description, date_debut, date_fin, reduction)
VALUES 
('Promo Été', '10% sur les plats chauds', '2025-06-01', '2025-08-31', 10.00),
('Happy Hour', '2 pour 1 sur les boissons', '2025-09-01', '2025-09-30', 50.00);

-- ==========================================
-- EVENEMENTS
-- ==========================================
INSERT INTO evenement (titre, description, date_debut, date_fin, points_offerts)
VALUES 
('Soirée Étudiante', 'Ambiance campus', '2025-10-01 18:00', '2025-10-01 23:00', 30),
('Déjeuner Spécial', 'Menu à moitié prix pour étudiants', '2025-10-05 12:00', '2025-10-05 15:00', 20);

-- ==========================================
-- COMMANDES
-- ==========================================
INSERT INTO commande (id_utilisateur, montant_total, points_utilises, points_gagnes, mode_livraison, commentaire)
VALUES 
(1, 6500, 20, 30, 'livraison', 'Livraison rapide svp'),
(2, 4800, 0, 20, 'sur place', 'Service nickel');

-- ==========================================
-- PANIER (liens commande + menu)
-- ==========================================
INSERT INTO panier (id_commande, id_menu, quantite, prix_unitaire)
VALUES 
(1, 1, 2, 2500),
(1, 4, 1, 800),
(2, 2, 1, 3500),
(2, 4, 2, 800);

-- ==========================================
-- PAIEMENT
-- ==========================================
INSERT INTO paiement (id_commande, montant, methode_paiement, statut)
VALUES 
(1, 6500, 'mobile_money', 'effectue'),
(2, 4800, 'carte', 'en_attente');

-- ==========================================
-- RECLAMATIONS
-- ==========================================
INSERT INTO reclamation (id_etudiant, id_commande, description)
VALUES 
(1, 1, 'Commande arrivée froide'),
(2, 2, 'Oubli de boisson dans le sac');

-- ==========================================
-- HISTORIQUE POINTS
-- ==========================================
INSERT INTO historique_points (id_etudiant, points_gagnes, description)
VALUES 
(1, 30, 'Commande #1'),
(2, 20, 'Commande #2');

-- ==========================================
-- PARRAINAGE
-- ==========================================
INSERT INTO parrainage (id_parrain, id_filleul)
VALUES 
(1, 2);

-- ==========================================
-- PARTICIPATION EVENEMENT
-- ==========================================
INSERT INTO participation_evenement (id_utilisateur, id_evenement)
VALUES 
(1, 1), 
(2, 2);

-- ==========================================
-- BENEFICIE PROMOTION
-- ==========================================
INSERT INTO beneficie_promotion (id_etudiant, id_promotion)
VALUES 
(1, 1), 
(2, 2);
