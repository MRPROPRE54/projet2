import React, { useState } from 'react';
import { 
  Users, Settings, TrendingUp, DollarSign, ShoppingBag,
  UserPlus, Edit, Trash2, Image, Calendar, Gift
} from 'lucide-react';

const AdminDashboard = ({ stats, menuItems, promotions, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newPromotion, setNewPromotion] = useState({
    title: '',
    description: '',
    type: 'promotion',
    startDate: '',
    endDate: ''
  });
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });

  const handleCreatePromotion = (e) => {
    e.preventDefault();
    alert(`Nouvelle promotion créée: ${newPromotion.title}`);
    setNewPromotion({ title: '', description: '', type: 'promotion', startDate: '', endDate: '' });
  };

  const handleCreateMenuItem = (e) => {
    e.preventDefault();
    alert(`Nouvel article ajouté: ${newMenuItem.name}`);
    setNewMenuItem({ name: '', category: '', price: '', description: '' });
  };

  return (
    <div className="container my-4 fade-in">
      {/* En-tête */}
      <div className="card border-0 shadow mb-4" style={{ borderLeft: '4px solid var(--primary)' }}>
        <div className="card-body">
          <h3 className="mb-3">Administration</h3>
          <p className="text-muted mb-0">
            Gestion complète de la plateforme Mon Miam Miam
          </p>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm" style={{ borderLeft: '4px solid var(--primary)' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="text-muted mb-1">Revenus du Mois</h6>
                  <h3 className="mb-0">{(stats.month.revenue / 1000).toFixed(0)}K F</h3>
                  <small className="text-success">↑ +12.5%</small>
                </div>
                <DollarSign size={32} style={{ color: 'var(--success)' }} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm" style={{ borderLeft: '4px solid var(--info)' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="text-muted mb-1">Commandes</h6>
                  <h3 className="mb-0">{stats.month.orders}</h3>
                  <small className="text-info">Ce mois</small>
                </div>
                <ShoppingBag size={32} style={{ color: 'var(--info)' }} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm" style={{ borderLeft: '4px solid var(--warning)' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="text-muted mb-1">Nouveaux Clients</h6>
                  <h3 className="mb-0">{stats.month.newUsers}</h3>
                  <small className="text-warning">Ce mois</small>
                </div>
                <Users size={32} style={{ color: 'var(--warning)' }} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm" style={{ borderLeft: '4px solid #6c757d' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="text-muted mb-1">Points Utilisés</h6>
                  <h3 className="mb-0">{stats.month.loyaltyPointsUsed}</h3>
                  <small className="text-secondary">Ce mois</small>
                </div>
                <Gift size={32} style={{ color: '#6c757d' }} />
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
            <TrendingUp size={16} className="me-2" />
            Vue d'ensemble
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={16} className="me-2" />
            Utilisateurs
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <Edit size={16} className="me-2" />
            Menu
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'promotions' ? 'active' : ''}`}
            onClick={() => setActiveTab('promotions')}
          >
            <Gift size={16} className="me-2" />
            Promotions
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={16} className="me-2" />
            Paramètres
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
                  <h5 className="mb-0">Graphique des ventes (7 derniers jours)</h5>
                </div>
                <div className="card-body">
                  <div className="text-center py-5">
                    <TrendingUp size={64} className="text-muted mb-3" />
                    <p className="text-muted">
                      Graphique des tendances de vente
                    </p>
                    <div className="row mt-4">
                      {[45, 52, 38, 65, 58, 72, 68].map((value, index) => (
                        <div key={index} className="col text-center">
                          <div 
                            className="mx-auto"
                            style={{
                              height: `${value * 2}px`,
                              width: '40px',
                              backgroundColor: 'var(--primary)',
                              borderRadius: '4px 4px 0 0'
                            }}
                          ></div>
                          <small className="text-muted d-block mt-2">
                            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][index]}
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow mb-3">
                <div className="card-header bg-white">
                  <h6 className="mb-0">Objectifs du Mois</h6>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Revenus</span>
                      <strong>{Math.round((stats.month.revenue / 2000000) * 100)}%</strong>
                    </div>
                    <div className="progress" style={{ height: '10px' }}>
                      <div 
                        className="progress-bar"
                        style={{ 
                          width: `${(stats.month.revenue / 2000000) * 100}%`,
                          backgroundColor: 'var(--primary)'
                        }}
                      ></div>
                    </div>
                    <small className="text-muted">Objectif: 2M F</small>
                  </div>

                  <div className="mb-0">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Commandes</span>
                      <strong>{Math.round((stats.month.orders / 500) * 100)}%</strong>
                    </div>
                    <div className="progress" style={{ height: '10px' }}>
                      <div 
                        className="progress-bar bg-success"
                        style={{ width: `${(stats.month.orders / 500) * 100}%` }}
                      ></div>
                    </div>
                    <small className="text-muted">Objectif: 500 commandes</small>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow">
                <div className="card-header bg-white">
                  <h6 className="mb-0">Actions Rapides</h6>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-primary btn-sm">
                      <UserPlus size={16} className="me-2" />
                      Créer un employé
                    </button>
                    <button className="btn btn-outline-primary btn-sm">
                      <Edit size={16} className="me-2" />
                      Ajouter un plat
                    </button>
                    <button className="btn btn-outline-primary btn-sm">
                      <Gift size={16} className="me-2" />
                      Nouvelle promotion
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestion des utilisateurs */}
        {activeTab === 'users' && (
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
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Nom complet</label>
                      <input type="text" className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Rôle</label>
                      <select className="form-select">
                        <option value="employee">Employé</option>
                        <option value="manager">Gérant</option>
                        <option value="admin">Administrateur</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Créer l'utilisateur
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card border-0 shadow">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Tous les employés</h5>
                  <span className="badge bg-primary">5 actifs</span>
                </div>
                <div className="card-body">
                  <div className="list-group">
                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">Paul Nkosi</h6>
                          <small className="text-muted">Employé</small>
                        </div>
                        <div>
                          <button className="btn btn-sm btn-outline-secondary me-1">
                            <Edit size={14} />
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">Sophie Mbida</h6>
                          <small className="text-muted">Gérant</small>
                        </div>
                        <div>
                          <button className="btn btn-sm btn-outline-secondary me-1">
                            <Edit size={14} />
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestion du menu */}
        {activeTab === 'menu' && (
          <div className="row">
            <div className="col-md-5 mb-4">
              <div className="card border-0 shadow">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Ajouter un plat</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleCreateMenuItem}>
                    <div className="mb-3">
                      <label className="form-label">Nom du plat</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newMenuItem.name}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Catégorie</label>
                      <select 
                        className="form-select"
                        value={newMenuItem.category}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
                        required
                      >
                        <option value="">Choisir...</option>
                        <option value="Plats principaux">Plats principaux</option>
                        <option value="Boissons">Boissons</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Desserts">Desserts</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Prix (F CFA)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={newMenuItem.price}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={newMenuItem.description}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image</label>
                      <input type="file" className="form-control" accept="image/*" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      <Image size={18} className="me-2" />
                      Ajouter le plat
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-md-7 mb-4">
              <div className="card border-0 shadow">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Menu complet</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Plat</th>
                          <th>Catégorie</th>
                          <th>Prix</th>
                          <th>Statut</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {menuItems.slice(0, 8).map(item => (
                          <tr key={item.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img 
                                  src={item.image}
                                  alt={item.name}
                                  className="rounded me-2"
                                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                />
                                {item.name}
                              </div>
                            </td>
                            <td>{item.category}</td>
                            <td>{item.price} F</td>
                            <td>
                              <span className={`badge ${item.available ? 'bg-success' : 'bg-danger'}`}>
                                {item.available ? 'Disponible' : 'Épuisé'}
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-outline-secondary me-1">
                                <Edit size={14} />
                              </button>
                              <button className="btn btn-sm btn-outline-danger">
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestion des promotions */}
        {activeTab === 'promotions' && (
          <div className="row">
            <div className="col-md-5 mb-4">
              <div className="card border-0 shadow">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Créer une promotion</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleCreatePromotion}>
                    <div className="mb-3">
                      <label className="form-label">Titre</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newPromotion.title}
                        onChange={(e) => setNewPromotion({ ...newPromotion, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={newPromotion.description}
                        onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Type</label>
                      <select 
                        className="form-select"
                        value={newPromotion.type}
                        onChange={(e) => setNewPromotion({ ...newPromotion, type: e.target.value })}
                      >
                        <option value="promotion">Promotion</option>
                        <option value="event">Événement</option>
                      </select>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Date de début</label>
                        <input
                          type="date"
                          className="form-control"
                          value={newPromotion.startDate}
                          onChange={(e) => setNewPromotion({ ...newPromotion, startDate: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Date de fin</label>
                        <input
                          type="date"
                          className="form-control"
                          value={newPromotion.endDate}
                          onChange={(e) => setNewPromotion({ ...newPromotion, endDate: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Affiche</label>
                      <input type="file" className="form-control" accept="image/*" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      <Gift size={18} className="me-2" />
                      Créer la promotion
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-md-7 mb-4">
              <div className="card border-0 shadow">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Promotions actives</h5>
                </div>
                <div className="card-body">
                  {promotions.map(promo => (
                    <div key={promo.id} className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img 
                            src={promo.image}
                            className="img-fluid rounded-start"
                            alt={promo.title}
                            style={{ height: '150px', objectFit: 'cover', width: '100%' }}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="mb-0">{promo.title}</h6>
                              <span className={`badge ${promo.type === 'event' ? 'bg-info' : 'bg-success'}`}>
                                {promo.type === 'event' ? 'Événement' : 'Promotion'}
                              </span>
                            </div>
                            <p className="card-text" style={{ fontSize: '0.9rem' }}>
                              {promo.description}
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                <Calendar size={14} className="me-1" />
                                {new Date(promo.startDate).toLocaleDateString('fr-FR')} - 
                                {new Date(promo.endDate).toLocaleDateString('fr-FR')}
                              </small>
                            </p>
                            <div className="d-flex gap-2">
                              <button className="btn btn-sm btn-outline-secondary">
                                <Edit size={14} className="me-1" />
                                Modifier
                              </button>
                              <button className="btn btn-sm btn-outline-danger">
                                <Trash2 size={14} className="me-1" />
                                Supprimer
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Paramètres */}
        {activeTab === 'settings' && (
          <div className="card border-0 shadow">
            <div className="card-header bg-white">
              <h5 className="mb-0">Paramètres de l'application</h5>
            </div>
            <div className="card-body">
              <form>
                <h6 className="mb-3">Horaires d'ouverture</h6>
                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Heure d'ouverture</label>
                    <input type="time" className="form-control" defaultValue="08:00" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Heure de fermeture</label>
                    <input type="time" className="form-control" defaultValue="20:00" />
                  </div>
                </div>

                <h6 className="mb-3">Programme de fidélité</h6>
                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Points par 1000 F dépensés</label>
                    <input type="number" className="form-control" defaultValue="1" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Points pour 1000 F de réduction</label>
                    <input type="number" className="form-control" defaultValue="15" />
                  </div>
                </div>

                <h6 className="mb-3">Parrainage</h6>
                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Points bonus parrainage</label>
                    <input type="number" className="form-control" defaultValue="20" />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  <Settings size={18} className="me-2" />
                  Enregistrer les paramètres
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
