import React, { useState } from 'react';
import { 
  ShoppingCart, Trash2, Plus, Minus, CreditCard, 
  Award, Truck, Package, ArrowLeft, CheckCircle 
} from 'lucide-react';

const CartPage = ({ cart, onUpdateCart, onRemoveFromCart, currentUser, onNavigate, onCheckout }) => {
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [usePoints, setUsePoints] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser?.location || '');
  const [orderNote, setOrderNote] = useState('');

  // Calcul des coûts
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gamelleCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const gamelleCost = gamelleCount * 200; // 200F par plat
  const deliveryCost = deliveryType === 'delivery' ? 100 : 0; // 100F pour livraison
  
  // Calcul des points utilisables
  const availablePoints = currentUser?.loyaltyPoints || 0;
  const pointsValue = Math.floor(availablePoints / 15) * 1000; // 15 points = 1000F
  const pointsDiscount = usePoints ? Math.min(pointsValue, subtotal) : 0;
  
  const total = subtotal + gamelleCost + deliveryCost - pointsDiscount;
  const pointsToEarn = Math.floor(total / 1000); // 1 point par 1000F

  const handleQuantityChange = (itemId, change) => {
    const item = cart.find(i => i.id === itemId);
    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
      onRemoveFromCart(itemId);
    } else {
      onUpdateCart(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Votre panier est vide !');
      return;
    }

    if (deliveryType === 'delivery' && !deliveryAddress) {
      alert('Veuillez entrer une adresse de livraison');
      return;
    }

    if (!deliveryTime) {
      alert('Veuillez choisir une heure de retrait/livraison');
      return;
    }

    const orderData = {
      items: cart,
      deliveryType,
      deliveryAddress,
      deliveryTime,
      orderNote,
      subtotal,
      gamelleCost,
      deliveryCost,
      pointsDiscount,
      total,
      pointsToEarn,
      paymentMethod,
      usePoints
    };

    onCheckout(orderData);
  };

  const handleCinetPayPayment = () => {
  // Validation de la commande avant de procéder au paiement
  if (cart.length === 0) {
    alert('Votre panier est vide !');
    return;
  }

  if (deliveryType === 'delivery' && !deliveryAddress) {
    alert('Veuillez entrer une adresse de livraison');
    return;
  }

  if (!deliveryTime) {
    alert('Veuillez choisir une heure de retrait/livraison');
    return;
  }

  // Préparer les données de la commande
  const orderData = {
    items: cart,
    deliveryType,
    deliveryAddress,
    deliveryTime,
    orderNote,
    subtotal,
    gamelleCost,
    deliveryCost,
    pointsDiscount,
    total,
    pointsToEarn,
    paymentMethod: 'cinetpay',
    usePoints
  };

  console.log('Initialisation du paiement CinetPay avec:', orderData);

  // Pour le moment, afficher un message
  alert('Redirection vers CinetPay... (À implémenter avec votre backend Laravel)');
};

  if (cart.length === 0) {
    return (
      <div className="container my-5 fade-in">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card border-0 shadow">
              <div className="card-body py-5">
                <ShoppingCart size={80} className="text-muted mb-4" />
                <h3 className="mb-3">Votre panier est vide</h3>
                <p className="text-muted mb-4">
                  Découvrez notre menu et ajoutez vos plats préférés au panier
                </p>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => onNavigate('menu')}
                >
                  Voir le menu
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
      <div className="d-flex align-items-center mb-4">
        <button 
          className="btn btn-outline-secondary me-3"
          onClick={() => onNavigate('menu')}
        >
          <ArrowLeft size={18} className="me-2" />
          Retour au menu
        </button>
        <h2 className="mb-0">Mon Panier</h2>
      </div>

      <div className="row">
        {/* Liste des articles */}
        <div className="col-lg-7 mb-4">
          <div className="card border-0 shadow">
            <div className="card-header bg-white">
              <h5 className="mb-0">Articles ({cart.length})</h5>
            </div>
            <div className="card-body">
              {cart.map(item => (
                <div key={item.id} className="border-bottom pb-3 mb-3">
                  <div className="row align-items-center">
                    <div className="col-3 col-md-2">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="img-fluid rounded"
                        style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-9 col-md-10">
                      <div className="row align-items-center">
                        <div className="col-md-5 mb-2 mb-md-0">
                          <h6 className="mb-1">{item.name}</h6>
                          <small className="text-muted">{item.category}</small>
                        </div>
                        <div className="col-md-3 mb-2 mb-md-0">
                          <div className="d-flex align-items-center justify-content-center">
                            <button 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              style={{ width: '32px', height: '32px', padding: 0 }}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="mx-3" style={{ minWidth: '30px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleQuantityChange(item.id, 1)}
                              style={{ width: '32px', height: '32px', padding: 0 }}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="col-md-3 mb-2 mb-md-0 text-center">
                          <strong style={{ color: 'var(--primary)' }}>
                            {(item.price * item.quantity).toLocaleString('fr-FR')} F
                          </strong>
                        </div>
                        <div className="col-md-1 text-end">
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onRemoveFromCart(item.id)}
                            style={{ width: '32px', height: '32px', padding: 0 }}
                          >
                            <Trash2 size={14} />
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

        {/* Récapitulatif et options */}
        <div className="col-lg-5">
          {/* Type de livraison */}
          <div className="card border-0 shadow mb-3">
            <div className="card-header bg-white">
              <h6 className="mb-0">Type de commande</h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div 
                    className={`card text-center cursor-pointer ${deliveryType === 'on-site' ? 'border-primary' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setDeliveryType('on-site')}
                  >
                    <div className="card-body py-3">
                      <Package size={32} className="mb-2" style={{ color: 'var(--primary)' }} />
                      <h6 className="mb-0">Sur place</h6>
                      <small className="text-muted">Retrait</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div 
                    className={`card text-center cursor-pointer ${deliveryType === 'delivery' ? 'border-primary' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setDeliveryType('delivery')}
                  >
                    <div className="card-body py-3">
                      <Truck size={32} className="mb-2" style={{ color: 'var(--primary)' }} />
                      <h6 className="mb-0">Livraison</h6>
                      <small className="text-muted">+100 F</small>
                    </div>
                  </div>
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div className="mt-3">
                  <label className="form-label">Adresse de livraison</label>
                  <input
                    type="text"
                    className="form-control"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Résidence, chambre..."
                  />
                </div>
              )}

              <div className="mt-3">
                <label className="form-label">
                  {deliveryType === 'delivery' ? 'Heure de livraison' : 'Heure de retrait'}
                </label>
                <input
                  type="time"
                  className="form-control"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  min="08:00"
                  max="20:00"
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Note (optionnel)</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Instructions particulières..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Points de fidélité */}
          {currentUser && availablePoints >= 15 && (
            <div className="card border-0 shadow mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">
                      <Award size={18} style={{ color: 'var(--primary)' }} className="me-2" />
                      Utiliser mes points
                    </h6>
                    <small className="text-muted">
                      {availablePoints} points = {pointsValue.toLocaleString('fr-FR')} F
                    </small>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="usePoints"
                      checked={usePoints}
                      onChange={(e) => setUsePoints(e.target.checked)}
                      style={{ width: '48px', height: '24px', cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mode de paiement */}
          <div className="card border-0 shadow mb-3">
            <div className="card-header bg-white">
              <h6 className="mb-0">Mode de paiement</h6>
            </div>
            <div className="card-body">
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="cash"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="cash">
                  💵 Espèces à la livraison
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="mobile"
                  value="mobile"
                  checked={paymentMethod === 'mobile'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="mobile">
                  📱 Mobile Money
                </label>
              </div>
              <button
                type="button"
                className="cinetpay-button"
                onClick={handleCinetPayPayment}
                >
                  💳 CinetPay
                </button>
            </div>
          </div>

          {/* Récapitulatif */}
          <div className="card border-0 shadow">
            <div className="card-header bg-white">
              <h6 className="mb-0">Récapitulatif</h6>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Sous-total</span>
                <span>{subtotal.toLocaleString('fr-FR')} F</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>
                  Gamelles ({gamelleCount})
                  <small className="text-muted d-block">200F / plat</small>
                </span>
                <span>{gamelleCost.toLocaleString('fr-FR')} F</span>
              </div>
              {deliveryType === 'delivery' && (
                <div className="d-flex justify-content-between mb-2">
                  <span>Livraison</span>
                  <span>{deliveryCost.toLocaleString('fr-FR')} F</span>
                </div>
              )}
              {usePoints && pointsDiscount > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>
                    <Award size={16} className="me-1" />
                    Points fidélité
                  </span>
                  <span>-{pointsDiscount.toLocaleString('fr-FR')} F</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <strong style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>
                  {total.toLocaleString('fr-FR')} F
                </strong>
              </div>
              
              {currentUser && (
                <div className="alert alert-info mb-3" style={{ fontSize: '0.9rem' }}>
                  <Award size={16} className="me-2" />
                  Vous gagnerez <strong>{pointsToEarn} points</strong> avec cette commande
                </div>
              )}

              <button 
                className="btn btn-primary w-100 btn-lg"
                onClick={handleCheckout}
              >
                <CheckCircle size={20} className="me-2" />
                Confirmer la commande
              </button>
              
              <div className="text-center mt-3">
                <small className="text-muted">
                  Temps de préparation estimé : 15-20 min
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
