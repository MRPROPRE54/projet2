import React, { useState } from 'react';
import { ShoppingCart, Plus, Star, Search, Filter } from 'lucide-react';

const MenuPage = ({ menuItems, onAddToCart, currentUser, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Extraire les catégories uniques
  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  // Filtrer les items
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && item.available;
  });

  const handleAddToCart = (item) => {
    onAddToCart(item);
    // Afficher une notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <div class="alert alert-success d-flex align-items-center" style="margin: 0;">
        <svg width="20" height="20" fill="currentColor" class="me-2" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
        <strong>${item.name}</strong> ajouté au panier !
      </div>
    `;
    toast.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 9999; animation: slideIn 0.3s ease;';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };

  if (!currentUser || currentUser.role !== 'student') {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card border-0 shadow">
              <div className="card-body py-5">
                <h3 className="mb-3">Connectez-vous pour commander</h3>
                <p className="text-muted mb-4">
                  Vous devez être connecté avec un compte étudiant pour accéder au menu
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => onNavigate('login')}
                >
                  Se connecter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4 fade-in">
      {/* En-tête */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-3">Notre Menu</h2>
          
          {/* Barre de recherche */}
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rechercher un plat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 text-md-end">
              <button 
                className="btn btn-primary"
                onClick={() => onNavigate('cart')}
              >
                <ShoppingCart size={18} className="me-2" />
                Voir le panier
              </button>
            </div>
          </div>

          {/* Filtres de catégories */}
          <div className="d-flex flex-wrap gap-2 mb-4">
            {categories.map(category => (
              <button
                key={category}
                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? '🍽️ Tous' : 
                 category === 'Plats principaux' ? '🍲 Plats principaux' :
                 category === 'Boissons' ? '🥤 Boissons' :
                 category === 'Snacks' ? '🍟 Snacks' :
                 category === 'Desserts' ? '🍰 Desserts' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Liste des plats */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">Aucun plat trouvé</p>
        </div>
      ) : (
        <div className="row">
          {filteredItems.map(item => (
            <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100 border-0 shadow-sm card-hover">
                <div className="position-relative">
                  <img 
                    src={item.image} 
                    className="card-img-top" 
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  {item.isSpecial && (
                    <span 
                      className="position-absolute top-0 end-0 m-2 badge"
                      style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}
                    >
                      <Star size={14} className="me-1" />
                      Spécial
                    </span>
                  )}
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="flex-grow-1">
                    <h6 className="card-title mb-2">{item.name}</h6>
                    <p className="card-text text-muted" style={{ fontSize: '0.85rem' }}>
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-light text-dark">{item.category}</span>
                      <span style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>
                        <strong>{item.price.toLocaleString('fr-FR')} F</strong>
                      </span>
                    </div>
                    <button 
                      className="btn btn-primary w-100"
                      onClick={() => handleAddToCart(item)}
                    >
                      <Plus size={18} className="me-2" />
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;
