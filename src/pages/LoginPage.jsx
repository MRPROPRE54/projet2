import React, { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import RestoLoginImage from '../assets/image/Resto.png'; 

const LoginPage = ({ onLogin, onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simuler un délai de connexion
    setTimeout(() => {
      const result = onLogin(formData.email, formData.password);
      setLoading(false);
      
      if (!result.success) {
        setError(result.error);
      }
    }, 500);
  };

  // Comptes de démonstration
  const demoAccounts = [
    { email: 'jean.dupont@ucac-icam.com', password: 'Pass123', role: 'Étudiant' },
    { email: 'paul.nkosi@zeduc.com', password: 'Admin123', role: 'Employé' },
    { email: 'sophie.mbida@zeduc.com', password: 'Manager123', role: 'Gérant' },
    { email: 'admin@zeduc.com', password: 'Admin123', role: 'Administrateur' }
  ];

  const fillDemo = (email, password) => {
    setFormData({ email, password });
    setError('');
  };

  return (
    <div className="container my-5 fade-in">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card border-0 shadow-lg">
            <div className="row g-0">
              {/* Image côté gauche */}
              <div 
                className="col-md-6 d-none d-md-block"
                style={{
                  backgroundImage: `url(${RestoLoginImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              >
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(207,189,151,0.3) 100%)'
                  }}
                >
                  <div className="h-100 d-flex flex-column justify-content-center align-items-center text-white p-5">
                    <h2 className="mb-4" style={{ color: 'var(--primary)' }}>
                      Bon retour !
                    </h2>
                    <p className="text-center">
                      Connectez-vous pour commander vos plats préférés et profiter de nos offres exclusives.
                    </p>
                  </div>
                </div>
              </div>

              {/* Formulaire côté droit */}
              <div className="col-md-6">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <h3>Connexion</h3>
                    <p className="text-muted">Accédez à votre espace personnel</p>
                  </div>

                  {error && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                      <AlertCircle size={20} className="me-2" />
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        <Mail size={16} className="me-2" />
                        Adresse email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre.email@exemple.com"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        <Lock size={16} className="me-2" />
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="remember" />
                      <label className="form-check-label" htmlFor="remember">
                        Se souvenir de moi
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary w-100 mb-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Connexion...
                        </>
                      ) : (
                        'Se connecter'
                      )}
                    </button>

                    <div className="text-center">
                      <a href="#" className="text-muted" style={{ fontSize: '0.9rem' }}>
                        Mot de passe oublié ?
                      </a>
                    </div>
                  </form>

                  <hr className="my-4" />

                  <div className="text-center">
                    <p className="text-muted mb-2">Pas encore de compte ?</p>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => onNavigate('register')}
                    >
                      S'inscrire
                    </button>
                  </div>

                  {/* Comptes de démonstration */}
                  <div className="mt-4">
                    <p className="text-muted text-center mb-2" style={{ fontSize: '0.85rem' }}>
                      <strong>Comptes de démonstration :</strong>
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      {demoAccounts.map((account, index) => (
                        <button
                          key={index}
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => fillDemo(account.email, account.password)}
                          style={{ fontSize: '0.75rem' }}
                        >
                          {account.role}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
