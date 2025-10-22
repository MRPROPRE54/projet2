import React, { useState } from 'react';
import { User, Mail, Lock, Phone, MapPin, Gift, AlertCircle, CheckCircle } from 'lucide-react';

const RegisterPage = ({ onRegister, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    referralCode: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Effacer l'erreur du champ modifié
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères, une majuscule et un chiffre';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'La localisation est requise pour les livraisons';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const result = onRegister(formData);
      setLoading(false);
      
      if (!result.success) {
        setErrors({ general: result.error });
      }
    }, 500);
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = ['', 'Faible', 'Moyen', 'Bon', 'Excellent'];
    const colors = ['', 'danger', 'warning', 'info', 'success'];

    return { 
      strength: (strength / 4) * 100, 
      label: labels[strength], 
      color: colors[strength] 
    };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="container my-5 fade-in">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h3>Créer un compte</h3>
                <p className="text-muted">Rejoignez la communauté Mon Miam Miam</p>
              </div>

              {errors.general && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <AlertCircle size={20} className="me-2" />
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Nom complet */}
                  <div className="col-md-12 mb-3">
                    <label htmlFor="name" className="form-label">
                      <User size={16} className="me-2" />
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  {/* Email */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      <Mail size={16} className="me-2" />
                      Adresse email *
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean.dupont@ucac-icam.com"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  {/* Téléphone */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">
                      <Phone size={16} className="me-2" />
                      Numéro de téléphone *
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+237 690 000 000"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  {/* Localisation */}
                  <div className="col-md-12 mb-3">
                    <label htmlFor="location" className="form-label">
                      <MapPin size={16} className="me-2" />
                      Localisation (pour les livraisons) *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Résidence La Terrasse, Chambre 205"
                    />
                    {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                  </div>

                  {/* Mot de passe */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="password" className="form-label">
                      <Lock size={16} className="me-2" />
                      Mot de passe *
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="progress" style={{ height: '5px' }}>
                          <div 
                            className={`progress-bar bg-${passwordStrength.color}`}
                            style={{ width: `${passwordStrength.strength}%` }}
                          ></div>
                        </div>
                        <small className={`text-${passwordStrength.color}`}>
                          {passwordStrength.label}
                        </small>
                      </div>
                    )}
                  </div>

                  {/* Confirmation mot de passe */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      <Lock size={16} className="me-2" />
                      Confirmer le mot de passe *
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <div className="mt-2">
                        <small className="text-success">
                          <CheckCircle size={14} className="me-1" />
                          Les mots de passe correspondent
                        </small>
                      </div>
                    )}
                  </div>

                  {/* Code de parrainage (optionnel) */}
                  <div className="col-md-12 mb-3">
                    <label htmlFor="referralCode" className="form-label">
                      <Gift size={16} className="me-2" />
                      Code de parrainage (optionnel)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="referralCode"
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleChange}
                      placeholder="JEAN2024"
                    />
                    <small className="text-muted">
                      Gagnez 10 points bonus en utilisant un code de parrainage !
                    </small>
                  </div>
                </div>

                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="terms" required />
                  <label className="form-check-label" htmlFor="terms">
                    J'accepte les{' '}
                    <a href="#" style={{ color: 'var(--primary)' }}>conditions d'utilisation</a>
                    {' '}et la{' '}
                    <a href="#" style={{ color: 'var(--primary)' }}>politique de confidentialité</a>
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
                      Création du compte...
                    </>
                  ) : (
                    'S\'inscrire'
                  )}
                </button>
              </form>

              <hr className="my-4" />

              <div className="text-center">
                <p className="text-muted mb-2">Vous avez déjà un compte ?</p>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => onNavigate('login')}
                >
                  Se connecter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
