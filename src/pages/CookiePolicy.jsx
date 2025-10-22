import React from 'react';
import { Cookie, Shield, Settings, FileText, Lock, Globe } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* En-tête */}
          <div className="text-center mb-5">
            <div className="d-flex justify-content-center mb-3">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--secondary)'
                }}
              >
                <Cookie size={40} />
              </div>
            </div>
            <h1 className="mb-3" style={{ color: 'var(--secondary)' }}>
              Politique de Gestion des Cookies
            </h1>
            <p className="text-muted">
              Date de dernière mise à jour : 21 octobre 2025
            </p>
          </div>

          {/* Section 1 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}>
              <h3 className="h5 mb-0 d-flex align-items-center">
                <FileText size={20} className="me-2" />
                1. Qu'est-ce qu'un cookie ?
              </h3>
            </div>
            <div className="card-body p-4">
              <p className="mb-3">
                Un cookie est un petit fichier texte (traceur) déposé sur votre terminal 
                (ordinateur, tablette, smartphone) lorsque vous consultez notre site. Il permet 
                à son émetteur d'identifier votre terminal pendant la durée de validité ou 
                d'enregistrement du cookie.
              </p>
              <div className="alert alert-info border-0 mb-0" style={{ backgroundColor: 'rgba(207, 189, 151, 0.1)' }}>
                <p className="mb-0">
                  <strong>Note importante :</strong> Seul l'émetteur d'un cookie est susceptible 
                  de lire ou de modifier les informations qui y sont contenues.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}>
              <h3 className="h5 mb-0 d-flex align-items-center">
                <Settings size={20} className="me-2" />
                2. Quels types de cookies utilisons-nous et pourquoi ?
              </h3>
            </div>
            <div className="card-body p-4">
              <p className="mb-4">
                Nous utilisons différents types de cookies dont les finalités sont détaillées ci-dessous :
              </p>

              {/* 2.1 Cookies Strictement Nécessaires */}
              <div className="mb-4">
                <h4 className="h6 mb-3" style={{ color: 'var(--primary)' }}>
                  2.1. Les Cookies Strictement Nécessaires (Exemptés de consentement)
                </h4>
                <p className="mb-3">
                  Ces cookies sont indispensables au bon fonctionnement de notre Site et vous permettent 
                  d'utiliser ses fonctionnalités principales, comme la navigation, l'accès à votre compte 
                  client, la gestion de votre panier d'achat et la finalisation de votre commande. 
                  Sans ces cookies, le site ne pourrait pas fonctionner correctement.
                </p>
                
                <div className="table-responsive mb-3">
                  <table className="table table-bordered">
                    <thead style={{ backgroundColor: 'rgba(207, 189, 151, 0.2)' }}>
                      <tr>
                        <th>Catégorie</th>
                        <th>Exemples de Finalités</th>
                        <th>Durée de conservation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Cookies de session/authentification</td>
                        <td>Mémoriser votre connexion à votre compte client.</td>
                        <td>Durée de la session</td>
                      </tr>
                      <tr>
                        <td>Cookies de panier d'achat</td>
                        <td>Enregistrer les articles ajoutés à votre panier.</td>
                        <td>Durée de la session / quelques heures</td>
                      </tr>
                      <tr>
                        <td>Cookies de sécurité</td>
                        <td>Mettre en œuvre des mesures de sécurité (ex. : lutte contre la fraude).</td>
                        <td>Durée de la session</td>
                      </tr>
                      <tr>
                        <td>Cookies de préférence de l'utilisateur</td>
                        <td>Mémoriser votre choix d'acceptation ou de refus des autres cookies.</td>
                        <td>--</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="alert alert-success border-0" style={{ backgroundColor: 'rgba(40, 167, 69, 0.1)' }}>
                  <p className="mb-0">
                    <strong>Base légale :</strong> Notre intérêt légitime à assurer le bon fonctionnement 
                    du service que vous sollicitez. Votre consentement n'est pas requis pour ces cookies.
                  </p>
                </div>
              </div>

              {/* 2.2 Cookies Facultatifs */}
              <div>
                <h4 className="h6 mb-3" style={{ color: 'var(--primary)' }}>
                  2.2. Les Cookies Facultatifs (Soumis à votre consentement)
                </h4>
                <p className="mb-3">
                  Ces cookies ne sont pas essentiels au fonctionnement du Site mais permettent d'améliorer 
                  votre expérience, de réaliser des statistiques ou de vous proposer des contenus personnalisés.
                </p>

                <div className="ps-3">
                  <div className="mb-3">
                    <h5 className="h6 mb-2">a) Cookies de Performance et d'Analyse</h5>
                    <p className="mb-2">
                      Ils nous permettent de connaître l'utilisation et les performances de notre Site, 
                      d'établir des statistiques, des volumes de fréquentation et d'utilisation des divers 
                      éléments (contenus visités, parcours) afin d'améliorer l'intérêt et l'ergonomie de 
                      nos services (par exemple, les pages les plus consultées, les taux d'erreur).
                    </p>
                    <ul className="mb-0">
                      <li>Exemples de finalités : Mesure d'audience (ex. : Google Analytics), 
                      suivi de l'efficacité de nos campagnes de marketing.</li>
                    </ul>
                  </div>

                  <div className="mb-3">
                    <h5 className="h6 mb-2">b) Cookies de Fonctionnalité</h5>
                    <p className="mb-0">
                      Ils sont utilisés pour améliorer l'interactivité du Site en mémorisant les préférences 
                      de l'utilisateur (ex. : langue, mémorisation des données saisies dans les formulaires).
                    </p>
                  </div>

                  <div>
                    <h5 className="h6 mb-2">c) Cookies Publicitaires (Ciblage) et de Réseaux Sociaux</h5>
                    <p className="mb-2">
                      Ces cookies sont déposés par nos partenaires et nous, afin de :
                    </p>
                    <ul className="mb-0">
                      <li>Vous proposer des publicités personnalisées sur notre Site ou en dehors de celui-ci, 
                      adaptées à vos centres d'intérêts.</li>
                      <li>Permettre le partage de contenu sur les réseaux sociaux 
                      (ex. : boutons "J'aime" ou "Partager").</li>
                      <li>Suivre votre navigation sur d'autres sites web pour créer votre profil d'intérêt.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}>
              <h3 className="h5 mb-0 d-flex align-items-center">
                <Settings size={20} className="me-2" />
                3. Gestion de vos préférences de cookies
              </h3>
            </div>
            <div className="card-body p-4">
              <p className="mb-3">
                Conformément à la réglementation (RGPD et directive ePrivacy), le dépôt des cookies 
                facultatifs (section 2.2) nécessite votre consentement préalable.
              </p>
              <p className="mb-3">
                Lors de votre première visite sur notre Site, un bandeau d'information (bannière) 
                vous a été présenté vous permettant :
              </p>
              <ol className="mb-3">
                <li className="mb-2">D'accepter tous les cookies.</li>
                <li className="mb-0">De refuser tous les cookies (sauf les strictement nécessaires).</li>
              </ol>
              <div className="alert alert-warning border-0" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)' }}>
                <p className="mb-0">
                  <strong>Important :</strong> Vous pouvez à tout moment modifier vos choix concernant 
                  les cookies facultatifs en cliquant sur le lien « Gestion des cookies » 
                  (généralement présent dans le pied de page du Site).
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}>
              <h3 className="h5 mb-0 d-flex align-items-center">
                <Globe size={20} className="me-2" />
                4. Transfert de données
              </h3>
            </div>
            <div className="card-body p-4">
              <p className="mb-0">
                Les données collectées via les cookies facultatifs peuvent être transférées à nos 
                partenaires et prestataires de services tiers (ex. : Google pour l'analyse, Facebook 
                pour la publicité), certains pouvant être situés en dehors de l'Union Européenne. 
                Nous nous engageons à prendre toutes les mesures nécessaires pour assurer la sécurité 
                de vos données, en exigeant de ces partenaires qu'ils respectent le RGPD.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}>
              <h3 className="h5 mb-0 d-flex align-items-center">
                <Shield size={20} className="me-2" />
                5. Plus d'informations
              </h3>
            </div>
            <div className="card-body p-4">
              <p className="mb-0">
                Pour plus de détails sur le traitement de vos données personnelles et l'exercice de vos 
                droits (accès, rectification, effacement, etc.), veuillez consulter notre{' '}
                <strong style={{ color: 'var(--primary)' }}>Politique de Confidentialité</strong>.
              </p>
            </div>
          </div>

          {/* Pied de page de la politique */}
          <div className="alert alert-light border text-center" role="alert">
            <p className="mb-0">
              <strong>🍽️ Mon Miam Miam</strong> - Nous respectons votre vie privée et vos choix
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
