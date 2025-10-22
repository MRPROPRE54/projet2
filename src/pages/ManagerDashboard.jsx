import React, { useState } from 'react';
import { 
  Users, TrendingUp, DollarSign, ShoppingBag, 
  UserPlus, MessageSquare, Eye, CheckCircle, XCircle 
} from 'lucide-react';

const ManagerDashboard = ({ stats, orders, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    password: 'Employee123'
  });

  const handleCreateEmployee = (e) => {
    e.preventDefault();
    alert(`Nouvel employé créé: ${newEmployee.name}\nEmail: ${newEmployee.email}\nMot de passe: ${newEmployee.password}`);
    setNewEmployee({ name: '', email: '', phone: '', password: 'Employee123' });
  };

  return (
    <div className="container my-4 fade-in">
      {/* En-tête */}
      <div className="card border-0 shadow mb-4" style={{ borderLeft: '4px solid var(--primary)' }}>
        <div className="card-body">
          <h3 className="mb-3">Espace Gérant</h3>
          <p className="text-muted mb-0">
            Supervisez les opérations et gérez votre équipe
          </p>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="text-muted mb-0">Commandes</h6>
                  <h3 className="mb-0">{stats.today.orders}</h3>
                  <small className="text-success">Aujourd'hui</small>
                </div>
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'rgba(207, 189, 151, 0.2)',
                    color: 'var(--primary)'
                  }}
                >
                  <ShoppingBag size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="text-muted mb-0">Revenus</h6>
                  <h3 className="mb-0">{(stats.today.revenue / 1000).toFixed(1)}K</h3>
                  <small className="text-success">Aujourd'hui</small>
                </div>
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'rgba(40, 167, 69, 0.2)',
                    color: 'var(--success)'
                  }}
                >
                  <DollarSign size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="text-muted mb-0">Semaine</h6>
                  <h3 className="mb-0">{stats.week.orders}</h3>
                  <small className="text-info">commandes</small>
                </div>
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'rgba(23, 162, 184, 0.2)',
                    color: 'var(--info)'
                  }}
                >
                  <TrendingUp size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="text-muted mb-0">Nouveaux</h6>
                  <h3 className="mb-0">{stats.month.newUsers}</h3>
                  <small className="text-warning">Ce mois</small>
                </div>
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
                    color: 'var(--warning)'
                  }}
                >
                  <Users size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Eye size={16} className="me-2" />
            Vue d'ensemble
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={16} className="me-2" />
            Commandes
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            <Users size={16} className="me-2" />
            Employés
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <TrendingUp size={16} className="me-2" />
            Statistiques
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
      </ul>

      {/* Contenu des onglets */}
      <div className="tab-content">
        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="row">
            <div className="col-md-8 mb-4">
              <div className="card border-0 shadow">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Activité récente</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Commande</th>
                          <th>Client</th>
                          <th>Montant</th>
                          <th>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map(order => (
                          <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.userName}</td>
                            <td>{order.total.toLocaleString('fr-FR')} F</td>
                            <td>
                              <span className={`badge ${
                                order.status === 'completed' ? 'bg-success' : 
                                order.status === 'pending' ? 'bg-warning' : 'bg-info'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Statistiques rapides</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Revenus du mois</span>
                      <strong>{stats.month.revenue.toLocaleString('fr-FR')} F</strong>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div 
                        className="progress-bar"
                        style={{ 
                          width: '68%',
                          backgroundColor: 'var(--primary)'
                        }}
                      ></div>
                    </div>
                    <small className="text-muted">68% de l'objectif</small>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Commandes du mois</span>
                      <strong>{stats.month.orders}</strong>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div 
                        className="progress-bar bg-success"
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                    <small className="text-muted">85% de l'objectif</small>
                  </div>

                  <div className="mb-0">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Points fidélité utilisés</span>
                      <strong>{stats.month.loyaltyPointsUsed}</strong>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div 
                        className="progress-bar bg-info"
                        style={{ width: '42%' }}
                      ></div>
                    </div>
                    <small className="text-muted">Bon engagement</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Supervision des commandes */}
        {activeTab === 'orders' && (
          <div className="card border-0 shadow">
            <div className="card-header bg-white">
              <h5 className="mb-0">Toutes les commandes</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>N° Commande</th>
                      <th>Date</th>
                      <th>Client</th>
                      <th>Articles</th>
                      <th>Type</th>
                      <th>Total</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
                        <td>{order.userName}</td>
                        <td>
                          <small>{order.items.length} article(s)</small>
                        </td>
                        <td>
                          {order.orderType === 'delivery' ? '🚚 Livraison' : '🍽️ Sur place'}
                        </td>
                        <td>{order.total.toLocaleString('fr-FR')} F</td>
                        <td>
                          <span className={`badge ${
                            order.status === 'completed' ? 'bg-success' : 
                            order.status === 'pending' ? 'bg-warning' : 
                            order.status === 'preparing' ? 'bg-info' : 'bg-danger'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Gestion des employés */}
        {activeTab === 'employees' && (
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card border-0 shadow">
                <div className="card-header bg-white">
                  <h5 className="mb-0">
                    <UserPlus size={20} className="me-2" />
                    Créer un employé
                  </h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleCreateEmployee}>
                    <div className="mb-3">
                      <label className="form-label">Nom complet</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Téléphone</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={newEmployee.phone}
                        onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mot de passe par défaut</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newEmployee.password}
                        onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                        required
                      />
                      <small className="text-muted">
                        L'employé pourra changer ce mot de passe après sa première connexion
                      </small>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      <UserPlus size={18} className="me-2" />
                      Créer l'employé
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card border-0 shadow">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Liste des employés</h5>
                </div>
                <div className="card-body">
                  <div className="list-group">
                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">Paul Nkosi</h6>
                          <small className="text-muted">paul.nkosi@zeduc.com</small>
                        </div>
                        <span className="badge bg-success">Actif</span>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">Alice Fotso</h6>
                          <small className="text-muted">alice.fotso@zeduc.com</small>
                        </div>
                        <span className="badge bg-success">Actif</span>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">Bernard Manga</h6>
                          <small className="text-muted">bernard.manga@zeduc.com</small>
                        </div>
                        <span className="badge bg-secondary">Inactif</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistiques détaillées */}
        {activeTab === 'stats' && (
          <div className="row">
            <div className="col-12 mb-4">
              <div className="card border-0 shadow">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Statistiques générales</h5>
                </div>
                <div className="card-body">
                  <div className="row text-center">
                    <div className="col-md-4 mb-3">
                      <h6 className="text-muted">Total commandes (mois)</h6>
                      <h2 style={{ color: 'var(--primary)' }}>{stats.month.orders}</h2>
                    </div>
                    <div className="col-md-4 mb-3">
                      <h6 className="text-muted">Chiffre d'affaires (mois)</h6>
                      <h2 style={{ color: 'var(--success)' }}>
                        {stats.month.revenue.toLocaleString('fr-FR')} F
                      </h2>
                    </div>
                    <div className="col-md-4 mb-3">
                      <h6 className="text-muted">Panier moyen</h6>
                      <h2 style={{ color: 'var(--info)' }}>
                        {Math.round(stats.month.revenue / stats.month.orders).toLocaleString('fr-FR')} F
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="card border-0 shadow">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Top 3 Plats de la Semaine</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    {stats.week.topItems.map((item, index) => (
                      <div key={index} className="col-md-4 mb-3">
                        <div className="text-center p-3 border rounded">
                          <div 
                            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                            style={{
                              width: '48px',
                              height: '48px',
                              backgroundColor: index === 0 ? 'gold' : index === 1 ? 'silver' : '#cd7f32',
                              color: 'white'
                            }}
                          >
                            {index + 1}
                          </div>
                          <h5>{item}</h5>
                          <p className="text-muted mb-0">Plat populaire</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Réclamations */}
        {activeTab === 'complaints' && (
          <div className="card border-0 shadow">
            <div className="card-header bg-white">
              <h5 className="mb-0">Gestion des réclamations</h5>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <MessageSquare size={20} className="me-2" />
                Toutes les réclamations ont été traitées. Excellent travail !
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
