import React, { useState } from 'react';
import { 
  ShoppingBag, Award, Users, MessageSquare, Gamepad2, 
  Copy, Check, TrendingUp, Clock, DollarSign, Star,
  Package, Truck, CheckCircle, XCircle
} from 'lucide-react';

const StudentDashboard = ({ 
  currentUser, 
  orders, 
  menuItems, 
  topClients,
  onNavigate,
  onAddToCart 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState(false);
  const [newComplaint, setNewComplaint] = useState({ subject: '', description: '' });
  const [topClientsFilter, setTopClientsFilter] = useState('month');

  // Statistiques utilisateur
  const userOrders = orders.filter(o => o.userId === currentUser.id);
  const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = userOrders.filter(o => o.status === 'pending' || o.status === 'preparing');
  const completedOrders = userOrders.filter(o => o.status === 'completed');

  // Points de fidélité
  const pointsValue = Math.floor(currentUser.loyaltyPoints / 15) * 1000;
  const pointsToNextReward = 15 - (currentUser.loyaltyPoints % 15);

  // Copier le code de parrainage
  const copyReferralCode = () => {
    navigator.clipboard.writeText(currentUser.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Soumettre une réclamation
  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    // Simuler l'envoi
    alert('Réclamation envoyée avec succès ! Nous vous répondrons dans les plus brefs délais.');
    setNewComplaint({ subject: '', description: '' });
    setActiveTab('overview');
  };

  // Statut de commande
  const getOrderStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'En attente', className: 'bg-warning', icon: Clock },
      preparing: { label: 'En préparation', className: 'bg-info', icon: Package },
      completed: { label: 'Terminée', className: 'bg-success', icon: CheckCircle },
      cancelled: { label: 'Annulée', className: 'bg-danger', icon: XCircle }
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`badge ${config.className}`}>
        <Icon size={14} className="me-1" />
        {config.label}
      </span>
    );
  };

  return (
    <div className="container my-4 fade-in">
      {/* En-tête du profil */}
      <div className="card border-0 shadow mb-4" style={{ borderLeft: '4px solid var(--primary)' }}>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--secondary)',
                    fontSize: '2rem'
                  }}
                >
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <h4 className="mb-1">Bienvenue, {currentUser.name} !</h4>
                  <p className="text-muted mb-1">
                    <Award size={16} className="me-1" style={{ color: 'var(--primary)' }} />
                    {currentUser.loyaltyPoints} points de fidélité
                  </p>
                  <p className="text-muted mb-0">
                    📍 {currentUser.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <button 
                className="btn btn-primary mb-2 w-100"
                onClick={() => onNavigate('menu')}
              >
                <ShoppingBag size={18} className="me-2" />
                Commander
              </button>
              <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                Membre depuis octobre 2024
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div 
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(207, 189, 151, 0.2)',
                  color: 'var(--primary)'
                }}
              >
                <ShoppingBag size={24} />
              </div>
              <h3 className="mb-0">{userOrders.length}</h3>
              <small className="text-muted">Commandes totales</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div 
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(207, 189, 151, 0.2)',
                  color: 'var(--primary)'
                }}
              >
                <DollarSign size={24} />
              </div>
              <h3 className="mb-0">{totalSpent.toLocaleString('fr-FR')} F</h3>
              <small className="text-muted">Total dépensé</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div 
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(207, 189, 151, 0.2)',
                  color: 'var(--primary)'
                }}
              >
                <Award size={24} />
              </div>
              <h3 className="mb-0">{currentUser.loyaltyPoints}</h3>
              <small className="text-muted">Points fidélité</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div 
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(207, 189, 151, 0.2)',
                  color: 'var(--primary)'
                }}
              >
                <Clock size={24} />
              </div>
              <h3 className="mb-0">{pendingOrders.length}</h3>
              <small className="text-muted">En cours</small>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets de navigation */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <ShoppingBag size={16} className="me-2" />
            Mes Commandes
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'loyalty' ? 'active' : ''}`}
            onClick={() => setActiveTab('loyalty')}
          >
            <Award size={16} className="me-2" />
            Fidélité
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'referral' ? 'active' : ''}`}
            onClick={() => setActiveTab('referral')}
          >
            <Users size={16} className="me-2" />
            Parrainage
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'complaints' ? 'active' : ''}`}
            onClick={() => setActiveTab('complaints')}
          >
            <MessageSquare size={16} className="me-2" />
            Réclamations
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'topclients' ? 'active' : ''}`}
            onClick={() => setActiveTab('topclients')}
          >
            <TrendingUp size={16} className="me-2" />
            Top Clients
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'games' ? 'active' : ''}`}
            onClick={() => setActiveTab('games')}
          >
            <Gamepad2 size={16} className="me-2" />
            Mini-jeux
          </button>
        </li>
      </ul>

      {/* Contenu des onglets */}
      <div className="tab-content">
        {/* Onglet Commandes */}
        {activeTab === 'overview' && (
          <div className="card border-0 shadow">
            <div className="card-header bg-white">
              <h5 className="mb-0">Historique des commandes</h5>
            </div>
            <div className="card-body">
              {userOrders.length === 0 ? (
                <div className="text-center py-5">
                  <ShoppingBag size={48} className="text-muted mb-3" />
                  <p className="text-muted">Vous n'avez pas encore passé de commande</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => onNavigate('menu')}
                  >
                    Découvrir le menu
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>N° Commande</th>
                        <th>Date</th>
                        <th>Articles</th>
                        <th>Total</th>
                        <th>Type</th>
                        <th>Statut</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userOrders.map(order => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
                          <td>
                            <small>{order.items.map(i => i.name).join(', ')}</small>
                          </td>
                          <td>{order.total.toLocaleString('fr-FR')} F</td>
                          <td>
                            {order.orderType === 'delivery' ? (
                              <span className="badge bg-primary">
                                <Truck size={14} className="me-1" />
                                Livraison
                              </span>
                            ) : (
                              <span className="badge bg-secondary">Sur place</span>
                            )}
                          </td>
                          <td>{getOrderStatusBadge(order.status)}</td>
                          <td>
                            <span className="badge badge-gold">
                              +{order.pointsEarned} pts
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Onglet Fidélité */}
        {activeTab === 'loyalty' && (
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body text-center">
                  <Award size={64} style={{ color: 'var(--primary)' }} className="mb-3" />
                  <h2 className="display-4" style={{ color: 'var(--primary)' }}>
                    {currentUser.loyaltyPoints}
                  </h2>
                  <p className="text-muted mb-3">Points de fidélité disponibles</p>
                  <div className="alert alert-info">
                    <strong>Valeur:</strong> {pointsValue.toLocaleString('fr-FR')} F de réduction
                  </div>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                    Plus que {pointsToNextReward} points pour votre prochaine récompense !
                  </p>
                  <div className="progress mb-2" style={{ height: '10px' }}>
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: `${((currentUser.loyaltyPoints % 15) / 15) * 100}%`,
                        backgroundColor: 'var(--primary)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card border-0 shadow h-100">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Comment ça marche ?</h5>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <div className="d-flex">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'var(--primary)',
                            color: 'var(--secondary)'
                          }}
                        >
                          1
                        </div>
                        <div>
                          <h6>Commandez</h6>
                          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                            Gagnez 1 point pour chaque 1000F dépensés
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="mb-3">
                      <div className="d-flex">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'var(--primary)',
                            color: 'var(--secondary)'
                          }}
                        >
                          2
                        </div>
                        <div>
                          <h6>Accumulez</h6>
                          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                            Collectionnez vos points à chaque commande
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="mb-0">
                      <div className="d-flex">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'var(--primary)',
                            color: 'var(--secondary)'
                          }}
                        >
                          3
                        </div>
                        <div>
                          <h6>Profitez</h6>
                          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                            15 points = 1000F de réduction sur votre prochaine commande
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Parrainage */}
        {activeTab === 'referral' && (
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="text-center mb-4">
                <Users size={64} style={{ color: 'var(--primary)' }} className="mb-3" />
                <h4>Parrainez vos amis et gagnez des points !</h4>
                <p className="text-muted">
                  Partagez votre code avec vos amis. Quand ils passent leur première commande, 
                  vous gagnez tous les deux 20 points de fidélité !
                </p>
              </div>
              
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div 
                    className="card text-center p-4"
                    style={{ 
                      backgroundColor: 'var(--primary)',
                      color: 'var(--secondary)'
                    }}
                  >
                    <p className="mb-2">Votre code de parrainage</p>
                    <h2 className="display-5 mb-3">{currentUser.referralCode}</h2>
                    <button 
                      className="btn btn-secondary"
                      onClick={copyReferralCode}
                    >
                      {copiedCode ? (
                        <>
                          <Check size={18} className="me-2" />
                          Copié !
                        </>
                      ) : (
                        <>
                          <Copy size={18} className="me-2" />
                          Copier le code
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="mb-2">Partager via :</p>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-outline-primary btn-sm">WhatsApp</button>
                      <button className="btn btn-outline-primary btn-sm">Telegram</button>
                      <button className="btn btn-outline-primary btn-sm">Email</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Réclamations */}
        {activeTab === 'complaints' && (
          <div className="card border-0 shadow">
            <div className="card-header bg-white">
              <h5 className="mb-0">Déposer une réclamation</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmitComplaint}>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Sujet</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    value={newComplaint.subject}
                    onChange={(e) => setNewComplaint({ ...newComplaint, subject: e.target.value })}
                    placeholder="Ex: Retard de livraison"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="4"
                    value={newComplaint.description}
                    onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                    placeholder="Décrivez votre problème en détail..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  <MessageSquare size={18} className="me-2" />
                  Envoyer la réclamation
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Onglet Top Clients */}
        {activeTab === 'topclients' && (
          <div className="card border-0 shadow">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Top 10 Clients</h5>
              <select 
                className="form-select form-select-sm" 
                style={{ width: 'auto' }}
                value={topClientsFilter}
                onChange={(e) => setTopClientsFilter(e.target.value)}
              >
                <option value="day">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
              </select>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Rang</th>
                      <th>Client</th>
                      <th>Commandes</th>
                      <th>Total Dépensé</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topClients.map((client, index) => (
                      <tr key={client.id} className={client.id === currentUser.id ? 'table-active' : ''}>
                        <td>
                          <div 
                            className="d-flex align-items-center justify-content-center rounded-circle"
                            style={{
                              width: '32px',
                              height: '32px',
                              backgroundColor: index < 3 ? 'var(--primary)' : 'var(--surface)',
                              color: index < 3 ? 'var(--secondary)' : 'var(--text-primary)'
                            }}
                          >
                            {index < 3 && <Star size={16} />}
                            {index >= 3 && (index + 1)}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center me-2"
                              style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: 'var(--primary)',
                                color: 'var(--secondary)',
                                fontSize: '0.85rem'
                              }}
                            >
                              {client.avatar}
                            </div>
                            <span>
                              {client.name}
                              {client.id === currentUser.id && (
                                <span className="badge bg-primary ms-2">Vous</span>
                              )}
                            </span>
                          </div>
                        </td>
                        <td>{client.totalOrders}</td>
                        <td>{client.totalSpent.toLocaleString('fr-FR')} F</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Mini-jeux */}
        {activeTab === 'games' && (
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body text-center">
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: 'rgba(207, 189, 151, 0.2)',
                      color: 'var(--primary)'
                    }}
                  >
                    <Gamepad2 size={40} />
                  </div>
                  <h5>Roue de la Chance</h5>
                  <p className="text-muted">
                    Tournez la roue et gagnez jusqu'à 50 points de fidélité !
                  </p>
                  <p className="mb-3">
                    <small className="text-muted">Coût: 10 points</small>
                  </p>
                  <button className="btn btn-primary" disabled={currentUser.loyaltyPoints < 10}>
                    Jouer maintenant
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body text-center">
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: 'rgba(207, 189, 151, 0.2)',
                      color: 'var(--primary)'
                    }}
                  >
                    <MessageSquare size={40} />
                  </div>
                  <h5>Quiz du Chef</h5>
                  <p className="text-muted">
                    Testez vos connaissances culinaires et gagnez 20 points !
                  </p>
                  <p className="mb-3">
                    <small className="text-muted">Coût: 5 points</small>
                  </p>
                  <button className="btn btn-primary" disabled={currentUser.loyaltyPoints < 5}>
                    Jouer maintenant
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
