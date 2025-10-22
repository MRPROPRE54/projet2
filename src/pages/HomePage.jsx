import React from 'react';
import { Star, Clock, MapPin, TrendingUp, Gift, Calendar } from 'lucide-react';

const HomePage = ({ menuItems, promotions, topClients, onNavigate, currentUser }) => {
  const specialItems = menuItems.filter(item => item.isSpecial);
  const activePromotions = promotions.filter(p => p.active);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div 
        className="text-white text-center py-5"
        style={{
          background: 'linear-gradient(135deg, var(--secondary) 0%, #333 100%)',
          borderBottom: '4px solid var(--primary)'
        }}
      >
        <div className="container">
          <h1 className="display-4 mb-3" style={{ color: 'var(--primary)' }}>
            Bienvenue chez Mon Miam Miam
          </h1>
          <p className="lead mb-4">
            Le restaurant préféré des étudiants de l'UCAC-ICAM
          </p>
          <div className="d-flex justify-content-center gap-4 mb-4 flex-wrap">
            <div className="d-flex align-items-center">
              <MapPin size={20} className="me-2" style={{ color: 'var(--primary)' }} />
              <span>Résidence La Terrasse, Yansoki</span>
            </div>
            <div className="d-flex align-items-center">
              <Clock size={20} className="me-2" style={{ color: 'var(--primary)' }} />
              <span>Ouvert 8h - 20h</span>
            </div>
          </div>
          {!currentUser && (
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate('register')}
            >
              Commander Maintenant
            </button>
          )}
        </div>
      </div>

      <div className="container my-5">
        {/* Promotions et Événements */}
        <section className="mb-5">
          <div className="d-flex align-items-center mb-4">
            <Gift size={28} className="me-2" style={{ color: 'var(--primary)' }} />
            <h2>Promotions & Événements</h2>
          </div>
          <div className="row">
            {activePromotions.map(promo => (
              <div key={promo.id} className="col-md-4 mb-4">
                <div className="card card-hover h-100 border-0 shadow">
                  <img 
                    src={promo.image} 
                    className="card-img-top" 
                    alt={promo.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <span 
                      className="badge mb-2"
                      style={{
                        backgroundColor: promo.type === 'event' ? 'var(--info)' : 'var(--success)'
                      }}
                    >
                      {promo.type === 'event' ? 'Événement' : 'Promotion'}
                    </span>
                    <h5 className="card-title">{promo.title}</h5>
                    <p className="card-text text-muted">{promo.description}</p>
                    <div className="d-flex align-items-center text-muted">
                      <Calendar size={16} className="me-2" />
                      <small>
                        {new Date(promo.startDate).toLocaleDateString('fr-FR')}
                        {promo.startDate !== promo.endDate && 
                          ` - ${new Date(promo.endDate).toLocaleDateString('fr-FR')}`
                        }
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Plats du Jour / Spécialités */}
        <section className="mb-5">
          <div className="d-flex align-items-center mb-4">
            <Star size={28} className="me-2" style={{ color: 'var(--primary)' }} />
            <h2>Nos Spécialités</h2>
          </div>
          <div className="row">
            {specialItems.map(item => (
              <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card card-hover h-100 border-0 shadow">
                  <div className="position-relative">
                    <img 
                      src={item.image} 
                      className="card-img-top" 
                      alt={item.name}
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <span 
                      className="position-absolute top-0 end-0 m-2 badge bg-danger"
                    >
                      Spécial
                    </span>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                      {item.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 mb-0" style={{ color: 'var(--primary)' }}>
                        {item.price} F
                      </span>
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => onNavigate(currentUser?.role === 'student' ? 'menu' : 'login')}
                      >
                        Commander
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button 
              className="btn btn-secondary"
              onClick={() => onNavigate(currentUser ? 'menu' : 'login')}
            >
              Voir tout le menu
            </button>
          </div>
        </section>

        {/* Top 10 Clients */}
        <section className="mb-5">
          <div className="d-flex align-items-center mb-4">
            <TrendingUp size={28} className="me-2" style={{ color: 'var(--primary)' }} />
            <h2>Top 10 Clients du Mois</h2>
          </div>
          <div className="card border-0 shadow">
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
                      <tr key={client.id}>
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
                            {index + 1}
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
                                color: 'var(--secondary)'
                              }}
                            >
                              {client.avatar}
                            </div>
                            {client.name}
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
        </section>

        {/* Avantages */}
        <section className="mb-5">
          <h2 className="text-center mb-4">Pourquoi Choisir Mon Miam Miam ?</h2>
          <div className="row text-center">
            <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
              <div className="p-4">
                <div 
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--secondary)'
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>🍽️</span>
                </div>
                <h5>Cuisine Délicieuse</h5>
                <p className="text-muted">Des plats traditionnels préparés avec soin</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="p-4">
                <div 
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--secondary)'
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>⚡</span>
                </div>
                <h5>Service Rapide</h5>
                <p className="text-muted">Commandez en ligne et gagnez du temps</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="p-4">
                <div 
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--secondary)'
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>🎁</span>
                </div>
                <h5>Programme Fidélité</h5>
                <p className="text-muted">Accumulez des points à chaque commande</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="p-4">
                <div 
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--secondary)'
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>🏖️</span>
                </div>
                <h5>Ambiance Unique</h5>
                <p className="text-muted">Vue sur la Dibamba et divertissements</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
