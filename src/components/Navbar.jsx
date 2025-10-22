import React, { useState } from 'react';
import { ShoppingCart, User, LogOut, Home, FileText, Menu, X } from 'lucide-react';

const Navbar = ({ currentUser, cartItemsCount, onNavigate, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const getRoleName = (role) => {
    const roleNames = {
      student: 'Étudiant',
      employee: 'Employé',
      manager: 'Gérant',
      admin: 'Administrateur'
    };
    return roleNames[role] || role;
  };

  const getDashboardLink = (role) => {
    const links = {
      student: 'student-dashboard',
      employee: 'employee-dashboard',
      manager: 'manager-dashboard',
      admin: 'admin-dashboard'
    };
    return links[role] || 'home';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsMenuOpen(false); // Fermer le menu après navigation
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top">
      <div className="container">
        <a 
          className="navbar-brand d-flex align-items-center" 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('home');
          }}
          style={{ cursor: 'pointer' }}
        >
          <span style={{ color: 'var(--primary)', fontSize: '1.5rem', marginRight: '0.5rem' }}>🍽️</span>
          <span style={{ color: 'var(--primary)' }}>Mon Miam Miam</span>
        </a>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          style={{ boxShadow: 'none' }}
        >
          {isMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
        </button>
        
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('home');
                }}
              >
                <Home size={18} className="me-1" />
                Accueil
              </a>
            </li>
            
            {currentUser ? (
              <>
                <li className="nav-item">
                  <a 
                    className="nav-link" 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(getDashboardLink(currentUser.role));
                    }}
                  >
                    <User size={18} className="me-1" />
                    <span className="d-lg-none">Mon Profil</span>
                    <span className="d-none d-lg-inline">Mon Espace</span>
                  </a>
                </li>
                
                {currentUser.role === 'student' && (
                  <>
                    <li className="nav-item">
                      <a 
                        className="nav-link" 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation('menu');
                        }}
                      >
                        🍽️ Menu
                      </a>
                    </li>
                    <li className="nav-item">
                      <a 
                        className="nav-link position-relative" 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation('cart');
                        }}
                      >
                        <ShoppingCart size={18} className="me-1" />
                        Panier
                        {cartItemsCount > 0 && (
                          <span 
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            style={{ fontSize: '0.65rem' }}
                          >
                            {cartItemsCount}
                          </span>
                        )}
                      </a>
                    </li>
                  </>
                )}
                
                <li className="nav-item dropdown">
                  <a 
                    className="nav-link dropdown-toggle d-flex align-items-center" 
                    href="#" 
                    role="button" 
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: 'var(--primary)',
                          color: 'var(--secondary)',
                          fontSize: '0.9rem'
                        }}
                      >
                        {currentUser.name.charAt(0)}
                      </div>
                      <div className="d-none d-xl-block">
                        <div style={{ fontSize: '0.9rem' }}>{currentUser.name}</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                          {getRoleName(currentUser.role)}
                        </div>
                      </div>
                      <div className="d-xl-none">
                        <span style={{ fontSize: '0.9rem' }}>Compte</span>
                      </div>
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li className="d-xl-none">
                      <div className="dropdown-header">
                        <strong>{currentUser.name}</strong>
                        <br />
                        <small className="text-muted">{getRoleName(currentUser.role)}</small>
                      </div>
                    </li>
                    <li className="d-xl-none"><hr className="dropdown-divider" /></li>
                    <li>
                      <a 
                        className="dropdown-item" 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(getDashboardLink(currentUser.role));
                        }}
                      >
                        <User size={16} className="me-2" />
                        Mon Profil
                      </a>
                    </li>
                    {currentUser.role === 'student' && (
                      <li>
                        <a 
                          className="dropdown-item" 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigation('student-dashboard');
                          }}
                        >
                          <FileText size={16} className="me-2" />
                          Mes Commandes
                        </a>
                      </li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a 
                        className="dropdown-item text-danger" 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
                            onLogout();
                          }
                        }}
                      >
                        <LogOut size={16} className="me-2" />
                        Déconnexion
                      </a>
                    </li>
                  </ul>
                </li>
                
                {/* Bouton déconnexion visible sur mobile */}
                <li className="nav-item d-lg-none mt-2">
                  <button 
                    className="btn btn-outline-danger btn-sm w-100"
                    onClick={() => {
                      if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
                        onLogout();
                      }
                    }}
                  >
                    <LogOut size={16} className="me-2" />
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a 
                    className="nav-link" 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('login');
                    }}
                  >
                    Connexion
                  </a>
                </li>
                <li className="nav-item mt-2 mt-lg-0">
                  <button 
                    className="btn btn-primary btn-sm w-100"
                    onClick={() => handleNavigation('register')}
                  >
                    S'inscrire
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
