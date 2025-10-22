import React, { useState } from 'react';
import { 
  Package, CheckCircle, XCircle, Edit, MessageSquare, 
  TrendingUp, DollarSign, ShoppingBag, Clock 
} from 'lucide-react';

const EmployeeDashboard = ({ orders, menuItems, stats, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'preparing');
  const todayOrders = orders.filter(o => {
    const orderDate = new Date(o.createdAt).toDateString();
    const today = new Date().toDateString();
    return orderDate === today;
  });

  const handleValidateOrder = (orderId) => {
    // Simuler la validation
    alert(`Commande #${orderId} marquée comme terminée`);
  };

  const handleCancelOrder = (orderId) => {
    if (confirm('Êtes-vous sûr de vouloir annuler cette commande ?')) {
      alert(`Commande #${orderId} annulée`);
    }
  };

  const handleUpdateMenuItem = (itemId, updates) => {
    // Simuler la mise à jour
    alert(`Menu mis à jour: ${JSON.stringify(updates)}`);
    setEditingItem(null);
  };

  return (
    <div className="container my-4 fade-in">
      {/* En-tête */}
      <div className="card border-0 shadow mb-4" style={{ borderLeft: '4px solid var(--primary)' }}>
        <div className="card-body">
          <h3 className="mb-3">Espace Employé</h3>
          <p className="text-muted mb-0">
            Gérez les commandes en temps réel et mettez à jour le menu
          </p>
        </div>
      </div>

      {/* Statistiques du jour */}
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <ShoppingBag size={32} style={{ color: 'var(--primary)' }} className="mb-2" />
              <h4 className="mb-0">{stats.today.orders}</h4>
              <small className="text-muted">Commandes aujourd'hui</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <DollarSign size={32} style={{ color: 'var(--success)' }} className="mb-2" />
              <h4 className="mb-0">{stats.today.revenue.toLocaleString('fr-FR')} F</h4>
              <small className="text-muted">Chiffre d'affaires</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <Clock size={32} style={{ color: 'var(--warning)' }} className="mb-2" />
              <h4 className="mb-0">{stats.today.pendingOrders}</h4>
              <small className="text-muted">En attente</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <TrendingUp size={32} style={{ color: 'var(--info)' }} className="mb-2" />
              <h4 className="mb-0">{stats.week.orders}</h4>
              <small className="text-muted">Cette semaine</small>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Package size={16} className="me-2" />
            Commandes ({pendingOrders.length})
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <Edit size={16} className="me-2" />
            Gestion Menu
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
        {/* Gestion des commandes */}
        {activeTab === 'orders' && (
          <div className="card border-0 shadow">
            <div className="card-header bg-white">
              <h5 className="mb-0">Commandes en attente</h5>
            </div>
            <div className="card-body">
              {pendingOrders.length === 0 ? (
                <div className="text-center py-5">
                  <Package size={48} className="text-muted mb-3" />
                  <p className="text-muted">Aucune commande en attente</p>
                </div>
              ) : (
                <div className="row">
                  {pendingOrders.map(order => (
                    <div key={order.id} className="col-md-6 mb-3">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <h6 className="mb-1">Commande #{order.id}</h6>
                              <small className="text-muted">{order.userName}</small>
                            </div>
                            <span className={`badge ${order.status === 'pending' ? 'bg-warning' : 'bg-info'}`}>
                              {order.status === 'pending' ? 'En attente' : 'En préparation'}
                            </span>
                          </div>
                          
                          <div className="mb-3">
                            <strong>Articles:</strong>
                            <ul className="list-unstyled mb-0 mt-2">
                              {order.items.map((item, index) => (
                                <li key={index} className="mb-1">
                                  {item.quantity}x {item.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                              <span><strong>Type:</strong></span>
                              <span className={order.orderType === 'delivery' ? 'text-primary' : 'text-secondary'}>
                                {order.orderType === 'delivery' ? '🚚 Livraison' : '🍽️ Sur place'}
                              </span>
                            </div>
                            {order.orderType === 'delivery' && (
                              <div className="d-flex justify-content-between mb-1">
                                <span><strong>Adresse:</strong></span>
                                <span className="text-muted">{order.location}</span>
                              </div>
                            )}
                            <div className="d-flex justify-content-between mb-1">
                              <span><strong>Heure:</strong></span>
                              <span className="text-muted">{order.deliveryTime}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span><strong>Total:</strong></span>
                              <span style={{ color: 'var(--primary)' }}>
                                {order.total.toLocaleString('fr-FR')} F
                              </span>
                            </div>
                          </div>
                          
                          {order.comment && (
                            <div className="alert alert-light mb-3" style={{ fontSize: '0.85rem' }}>
                              <strong>Note:</strong> {order.comment}
                            </div>
                          )}
                          
                          <div className="d-flex gap-2">
                            <button 
                              className="btn btn-success btn-sm flex-fill"
                              onClick={() => handleValidateOrder(order.id)}
                            >
                              <CheckCircle size={16} className="me-1" />
                              Terminer
                            </button>
                            <button 
                              className="btn btn-danger btn-sm flex-fill"
                              onClick={() => handleCancelOrder(order.id)}
                            >
                              <XCircle size={16} className="me-1" />
                              Annuler
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Gestion du menu */}
        {activeTab === 'menu' && (
          <div className="card border-0 shadow">
            <div className="card-header bg-white">
              <h5 className="mb-0">Gestion du Menu</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Catégorie</th>
                      <th>Prix</th>
                      <th>Disponibilité</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="rounded me-2"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                            <strong>{item.name}</strong>
                          </div>
                        </td>
                        <td>{item.category}</td>
                        <td>{item.price.toLocaleString('fr-FR')} F</td>
                        <td>
                          <span className={`badge ${item.available ? 'bg-success' : 'bg-danger'}`}>
                            {item.available ? 'Disponible' : 'Épuisé'}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button 
                              className="btn btn-outline-primary"
                              onClick={() => handleUpdateMenuItem(item.id, { available: !item.available })}
                            >
                              {item.available ? 'Marquer épuisé' : 'Marquer disponible'}
                            </button>
                            <button className="btn btn-outline-secondary">
                              <Edit size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Statistiques de la semaine */}
        {activeTab === 'stats' && (
          <div>
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <div className="card border-0 shadow">
                  <div className="card-body text-center">
                    <h6 className="text-muted">Total Semaine</h6>
                    <h3 className="mb-0">{stats.week.orders}</h3>
                    <small className="text-muted">commandes</small>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card border-0 shadow">
                  <div className="card-body text-center">
                    <h6 className="text-muted">Chiffre d'affaires</h6>
                    <h3 className="mb-0">{stats.week.revenue.toLocaleString('fr-FR')} F</h3>
                    <small className="text-muted">cette semaine</small>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card border-0 shadow">
                  <div className="card-body text-center">
                    <h6 className="text-muted">Moyenne par commande</h6>
                    <h3 className="mb-0">
                      {Math.round(stats.week.revenue / stats.week.orders).toLocaleString('fr-FR')} F
                    </h3>
                    <small className="text-muted">cette semaine</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow">
              <div className="card-header bg-white">
                <h5 className="mb-0">Top 3 Plats de la Semaine</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {stats.week.topItems.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: 'var(--primary)',
                            color: 'var(--secondary)'
                          }}
                        >
                          {index + 1}
                        </div>
                        <strong>{item}</strong>
                      </div>
                      <span className="badge bg-primary">⭐ Populaire</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Réclamations */}
        {activeTab === 'complaints' && (
          <div className="card border-0 shadow">
            <div className="card-header bg-white">
              <h5 className="mb-0">Réclamations des clients</h5>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <MessageSquare size={20} className="me-2" />
                Aucune réclamation en attente pour le moment.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
