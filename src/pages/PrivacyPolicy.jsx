import React from 'react';
import { Shield, Lock, Users, FileText, Mail, AlertCircle } from 'lucide-react';

const PrivacyPolicy = () => {
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
                <Shield size={40} />
              </div>
            </div>
            <h1 className="mb-3" style={{ color: 'var(--secondary)' }}>
              Politique de Confidentialité
            </h1>
            <p className="text-muted">
              Date d'entrée en vigueur : 20 octobre 2025
            </p>
          </div>

          {/* Introduction */}
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              <p className="mb-0">
                Cette politique de confidentialité décrit comment <strong>🍽️ Mon Miam Miam</strong> collecte, 
                utilise et protège les informations personnelles que vous fournissez lorsque vous utilisez 
                notre site web et nos services associés.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}>
              <h3 className="h5 mb-0 d-flex align-items-center">
                <FileText size={20} className="me-2" />
                1. Informations Que Nous Collectons
              </h3>
            </div>
            <div className="card-body p-4">
              <p className="mb-3">Nous pouvons collecter les types d'informations suivants :</p>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex">
                  <span className="me-2" style={{ color: 'var(--primary)' }}>•</span>
                  <div>
                    <strong>Informations d'identification personnelle :</strong> Nom, adresse e-mail, 
                    numéro de téléphone, adresse postale, etc.
                  </div>
                </li>
                <li className="mb-3 d-flex">
                  <span className="me-2" style={{ color: 'var(--primary)' }}>•</span>
                  <div>
                    <strong>Informations de paiement :</strong> Détails de carte de crédit ou 
                    autres informations de facturation (si applicable).
                  </div>
                </li>
                <li className="mb-3 d-flex">
                  <span className="me-2" style={{ color: 'var(--primary)' }}>•</span>
                  <div>
                    <strong>Informations d'utilisation :</strong> Données sur la façon dont vous 
                    utilisez nos Services, y compris vos interactions avec notre site et nos communications.
                  </div>
                </li>
                <li className="mb-0 d-flex">
                  <span className="me-2" style={{ color: 'var(--primary)' }}>•</span>
                  <div>
                    <strong>Cookies et technologies similaires :</strong> Nous utilisons des cookies 
                    pour améliorer votre expérience sur notre site. Pour plus d'informations, 
                    consultez notre Politique de Cookies.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}>
              <h3 className="h5 mb-0 d-flex align-items-center">
                <Users size={20} className="me-2" />
                2. Comment Nous Utilisons Vos Informations
              </h3>
            </div>
            <div className="card-body p-4">
              <p className="mb-3">Nous utilisons les informations collectées pour :</p>
              <ul className="list-unstyled">
                <li className="mb-2 d-flex">
                  <span className="me-2" style={{ color: 'var(--primary)' }}>•</span>
                  <div>Fournir, maintenir et améliorer nos Services.</div>
                </li>
                <li className="mb-2 d-flex">
                  <span className="me-2" style={{ color: 'var(--primary)' }}>•</span>
                  <div>Communiquer avec vous, y compris pour le service client et les mises à jour de produits.</div>
                </li>
                <li className="mb-2 d-flex">
                  <span className="me-2" style={{ color: 'var(--primary)' }}>•</span>
                  <div>Analyser l'utilisation de nos Services pour améliorer l'expérience utilisateur.</div>
                </li>
                <li className="mb-0 d-flex">
                  <span className="me-2" style={{ color: 'var(--primary)' }}>•</span>
                  <div>Envoyer des communications promotionnelles (si vous avez consenti à les recevoir).</div>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}>
              <h3 className="h5 mb-0 d-flex align-items-center">
                <FileText size={20} className="me-2" />
                3. Partage de Vos Informations
              </h3>
            </div>
            <div className="card-body p-4">
              <p className="mb-3">
                <strong>Nous ne vendons pas vos informations personnelles.</strong> Nous pouvons partager 
                vos informations dans les situations suivantes :
              </p>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex">
                  <span className="me-2" style={{ color: 'var(--primary)' }}>•</span>
                  <div>
                    <strong>Avec des prestataires de services :</strong> Nous pouvons partager vos 
                    informations avec des tiers qui fournissent des services en notre nom 
                    (comme le traitement des paiements, l'hébergement, etc.).
                  </div>
                </li>
                <li className="mb-3 d-flex">
                  <span className="me-2" style={{ color: 'var(--primary)' }}>•</span>
                  <div>
                    <strong>Conformité légale :</strong> Nous pouvons divulguer vos informations 
                    si la loi l'exige ou pour protéger nos droits.
                  </div>
                </li>
                <li className="mb-0 d-flex">
                  <span className="me-2" style={{ color: 'var(--primary)' }}>•</span>
                  <div>
                    <strong>Fusion ou acquisition :</strong> En cas de fusion, d'acquisition ou 
                    de transfert d'actifs, vos informations peuvent être transférées.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}>
              <h3 className="h5 mb-0 d-flex align-items-center">
                <Lock size={20} className="me-2" />
                4. Sécurité de Vos Informations
              </h3>
            </div>
            <div className="card-body p-4">
              <p className="mb-0">
                Nous prenons des mesures raisonnables pour protéger vos informations personnelles 
                contre la perte, le vol et l'utilisation abusive. Cependant, aucune méthode de 
                transmission sur Internet ou de stockage électronique n'est entièrement sécurisée. 
                Par conséquent, nous ne pouvons garantir une sécurité absolue.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}>
              <h3 className="h5 mb-0 d-flex align-items-center">
                <AlertCircle size={20} className="me-2" />
                5. Vos Droits
              </h3>
            </div>
            <div className="card-body p-4">
              <p className="mb-3">
                En vertu des lois sur la protection des données, vous avez certains droits concernant 
                vos informations personnelles, y compris :
              </p>
              <ul className="list-unstyled mb-4">
                <li className="mb-2 d-flex">
                  <span className="me-2" style={{ color: 'var(--primary)' }}>•</span>
                  <div>Le droit d'accéder à vos informations.</div>
                </li>
                <li className="mb-2 d-flex">
                  <span className="me-2" style={{ color: 'var(--primary)' }}>•</span>
                  <div>Le droit de demander la rectification de vos informations.</div>
                </li>
                <li className="mb-2 d-flex">
                  <span className="me-2" style={{ color: 'var(--primary)' }}>•</span>
                  <div>Le droit de demander l'effacement de vos informations.</div>
                </li>
                <li className="mb-0 d-flex">
                  <span className="me-2" style={{ color: 'var(--primary)' }}>•</span>
                  <div>Le droit de vous opposer au traitement de vos informations.</div>
                </li>
              </ul>
              <p className="mb-2">
                <strong>Pour exercer ces droits, veuillez nous contacter à l'adresse suivante :</strong>
              </p>
              <ul className="list-unstyled">
                <li className="mb-1">• felicia.kamdom@2029.ucac-icam.com</li>
                <li className="mb-1">• ryan.jipnang@2029.ucac-icam.com</li>
                <li className="mb-1">• ritter.soh@2029.ucac-icam.com</li>
                <li className="mb-1">• pharel.ngounou@2029.ucac-icam.com</li>
                <li className="mb-0">• martine.djanda@2029.ucac-icam.com</li>
              </ul>
            </div>
          </div>

          {/* Section 6 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}>
              <h3 className="h5 mb-0 d-flex align-items-center">
                <FileText size={20} className="me-2" />
                6. Changements à Cette Politique
              </h3>
            </div>
            <div className="card-body p-4">
              <p className="mb-0">
                Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. 
                Nous vous informerons de tout changement en publiant la nouvelle politique sur notre site. 
                Nous vous encourageons à consulter régulièrement cette page pour rester informé des modifications.
              </p>
            </div>
          </div>

          {/* Section 7 - Contact */}
          <div className="card shadow-sm mb-4">
            <div className="card-header" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}>
              <h3 className="h5 mb-0 d-flex align-items-center">
                <Mail size={20} className="me-2" />
                7. Contact
              </h3>
            </div>
            <div className="card-body p-4">
              <p className="mb-3">
                Si vous avez des questions concernant cette politique de confidentialité, 
                veuillez nous contacter à :
              </p>
              <div className="ps-3">
                <p className="mb-2"><strong>Groupe 6 – Mon Miam Miam</strong></p>
                <p className="mb-2">
                  <strong>Adresse :</strong> Institut Ucac-Icam
                </p>
                <p className="mb-2">
                  <strong>E-mail :</strong> contact@monmiammiam.com
                </p>
                <p className="mb-0">
                  <strong>Téléphone :</strong> +237 690 000 000
                </p>
              </div>
            </div>
          </div>

          {/* Pied de page de la politique */}
          <div className="alert alert-light border text-center" role="alert">
            <p className="mb-0">
              <strong>🍽️ Mon Miam Miam</strong> - Votre confidentialité est notre priorité
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
