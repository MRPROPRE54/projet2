import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer-custom mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 style={{ color: 'var(--primary)' }}>Mon Miam Miam</h5>
            <p className="text-white-50">
              Le restaurant préféré des étudiants de l'UCAC-ICAM. 
              Bon miam miam et ambiance conviviale au sommet de La Terrasse.
            </p>
          </div>
          
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 style={{ color: 'var(--primary)' }}>Contact</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center text-white-50">
                <MapPin size={16} className="me-2" />
                Résidence La Terrasse, Yansoki
              </li>
              <li className="mb-2 d-flex align-items-center text-white-50">
                <Phone size={16} className="me-2" />
                +237 690 000 000
              </li>
              <li className="mb-2 d-flex align-items-center text-white-50">
                <Mail size={16} className="me-2" />
                contact@monmiammiam.com
              </li>
            </ul>
          </div>
          
          <div className="col-lg-4 col-md-12 mb-4">
            <h5 style={{ color: 'var(--primary)' }}>Horaires</h5>
            <p className="text-white-50">
              Lundi - Vendredi: 16h - 21h<br />
              Samedi: 15h - 21h<br />
              Dimanche: 16h - 20h
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="https://www.facebook.com/" style={{ color: 'var(--primary)' }}>
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/" style={{ color: 'var(--primary)' }}>
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com/" style={{ color: 'var(--primary)' }}>
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <hr style={{ borderColor: 'var(--primary)', opacity: 0.3 }} />
        
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0 text-white-50" style={{ fontSize: '0.9rem' }}>
              © 2025 Mon Miam Miam - ZeDuc-Sp@ce. Tous droits réservés.
            </p>
            <p className="mt-2 mb-0">
              <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.85rem' }}>
                Mentions Légales
              </a>
              {' | '}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('privacy-policy');
                }}
                style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Politique de Confidentialité
              </a>
              {' | '}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('cookie-policy');
                }}
                style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Politique des Cookies
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
