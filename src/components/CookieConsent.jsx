import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setShowConsent(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div 
      className="position-fixed bottom-0 start-0 end-0 p-3 animate__animated animate__fadeInUp"
      style={{ 
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        borderTop: '3px solid var(--primary)'
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8 mb-3 mb-md-0">
            <div className="d-flex align-items-start">
              <Cookie size={32} className="me-3 flex-shrink-0" style={{ color: 'var(--primary)' }} />
              <div className="text-white">
                <h6 className="mb-2" style={{ color: 'var(--primary)' }}>
                  🍪 Utilisation des Cookies
                </h6>
                <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                  Nous utilisons des cookies pour améliorer votre expérience sur notre plateforme, 
                  mémoriser vos préférences et analyser notre trafic. En continuant à utiliser ce site, 
                  vous acceptez notre utilisation des cookies conformément à notre politique de confidentialité.
                </p>
                <a 
                  href="#" 
                  className="mt-2 d-inline-block" 
                  style={{ 
                    color: 'var(--primary)', 
                    textDecoration: 'underline',
                    fontSize: '0.85rem'
                  }}
                >
                  En savoir plus sur notre politique de cookies
                </a>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="d-flex gap-2 justify-content-md-end">
              <button 
                className="btn btn-outline-light btn-sm"
                onClick={handleDecline}
              >
                Refuser
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={handleAccept}
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
