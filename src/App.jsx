import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import SpinWheelGame from './pages/SpinWheelGame';
import ChefQuizGame from './pages/ChefQuizGame';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { authService } from './utils/auth';
import { 
  mockUsers, 
  mockMenuItems, 
  mockOrders, 
  mockPromotions, 
  mockTopClients,
  mockStats 
} from './data/mockData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [users, setUsers] = useState(mockUsers);
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [orders, setOrders] = useState(mockOrders);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Navigation
  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Connexion
  const handleLogin = (email, password) => {
    const result = authService.login(email, password, users);
    if (result.success) {
      setCurrentUser(result.user);
      // Rediriger vers le dashboard approprié
      const dashboards = {
        student: 'student-dashboard',
        employee: 'employee-dashboard',
        manager: 'manager-dashboard',
        admin: 'admin-dashboard'
      };
      setCurrentPage(dashboards[result.user.role] || 'home');
    }
    return result;
  };

  // Inscription
  const handleRegister = (userData) => {
    const result = authService.register(userData, users);
    if (result.success) {
      // Ajouter l'utilisateur à la liste
      const newUser = {
        id: users.length + 1,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: 'student',
        phone: userData.phone,
        location: userData.location,
        loyaltyPoints: userData.referralCode ? 10 : 0,
        referralCode: result.user.referralCode,
        totalOrders: 0,
        totalSpent: 0
      };
      setUsers([...users, newUser]);
      setCurrentUser(result.user);
      setCurrentPage('student-dashboard');
    }
    return result;
  };

  // Déconnexion
  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setCart([]);
    setCurrentPage('home');
  };

  // Gestion du panier
  const handleAddToCart = (item) => {
    const existingItem = cart.find(i => i.id === item.id);
    if (existingItem) {
      setCart(cart.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleUpdateCart = (itemId, newQuantity) => {
    setCart(cart.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleUpdateUserPoints = (userId, pointsChange) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          loy
        }
      }
    }))
  };

  const handleCheckout = (orderData) => {
    if (!currentUser) {
      alert('Erreur: utilisateur non connecté');
      return;
    }

    // Créer une nouvelle commande
    const newOrder = {
      id: 1000 + orders.length + 1,
      userId: currentUser.id,
      userName: currentUser.name,
      items: orderData.items.map(item => ({
        menuItemId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: orderData.total,
      status: 'pending',
      orderType: orderData.deliveryType,
      deliveryTime: orderData.deliveryTime,
      location: orderData.deliveryAddress,
      comment: orderData.orderNote,
      pointsEarned: orderData.pointsToEarn,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    setOrders([...orders, newOrder]);

    // Mettre à jour les points de l'utilisateur
    const pointsUsed = orderData.usePoints ? Math.floor(currentUser.loyaltyPoints / 15) * 15 : 0;
    const updatedUser = {
      ...currentUser,
      loyaltyPoints: currentUser.loyaltyPoints + orderData.pointsToEarn - pointsUsed
    };
    setCurrentUser(updatedUser);
    authService.updateUser(updatedUser);

    // Vider le panier
    setCart([]);

    // Afficher une confirmation
    alert(`✅ Commande confirmée !\n\nNuméro de commande: #${newOrder.id}\nTotal: ${orderData.total.toLocaleString('fr-FR')} F\n\nVous avez gagné ${orderData.pointsToEarn} points de fidélité !`);
    
    // Rediriger vers le dashboard
    setCurrentPage('student-dashboard');
  };

  // Rendu conditionnel des pages
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            menuItems={menuItems}
            promotions={mockPromotions}
            topClients={mockTopClients}
            onNavigate={handleNavigate}
            currentUser={currentUser}
          />
        );
      
      case 'login':
        return (
          <LoginPage 
            onLogin={handleLogin}
            onNavigate={handleNavigate}
          />
        );
      
      case 'register':
        return (
          <RegisterPage 
            onRegister={handleRegister}
            onNavigate={handleNavigate}
          />
        );
      
      case 'student-dashboard':
        if (!currentUser || currentUser.role !== 'student') {
          setCurrentPage('login');
          return null;
        }
        return (
          <StudentDashboard 
            currentUser={currentUser}
            orders={orders}
            menuItems={menuItems}
            topClients={mockTopClients}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        );
      
      case 'employee-dashboard':
        if (!currentUser || currentUser.role !== 'employee') {
          setCurrentPage('login');
          return null;
        }
        return (
          <EmployeeDashboard 
            orders={orders}
            menuItems={menuItems}
            stats={mockStats}
            onNavigate={handleNavigate}
          />
        );
      
      case 'manager-dashboard':
        if (!currentUser || currentUser.role !== 'manager') {
          setCurrentPage('login');
          return null;
        }
        return (
          <ManagerDashboard 
            stats={mockStats}
            orders={orders}
            onNavigate={handleNavigate}
          />
        );
      
      case 'admin-dashboard':
        if (!currentUser || currentUser.role !== 'admin') {
          setCurrentPage('login');
          return null;
        }
        return (
          <AdminDashboard 
            stats={mockStats}
            menuItems={menuItems}
            promotions={mockPromotions}
            onNavigate={handleNavigate}
          />
        );
      
      case 'menu':
        return (
          <MenuPage 
            menuItems={menuItems}
            onAddToCart={handleAddToCart}
            currentUser={currentUser}
            onNavigate={handleNavigate}
          />
        );
      
      case 'cart':
        if (!currentUser || currentUser.role !== 'student') {
          setCurrentPage('login');
          return null;
        }
        return (
          <CartPage 
            cart={cart}
            onUpdateCart={handleUpdateCart}
            onRemoveFromCart={handleRemoveFromCart}
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onCheckout={handleCheckout}
          />
        );

      case 'privacy-policy':
        return <PrivacyPolicy onNavigate={handleNavigate} />;

      case 'cookie-policy':
        return <CookiePolicy onNavigate={handleNavigate} />;
      
      default:
        return (
          <HomePage 
            menuItems={menuItems}
            promotions={mockPromotions}
            topClients={mockTopClients}
            onNavigate={handleNavigate}
            currentUser={currentUser}
          />
        );
    }
  };

  return (
    <>
      {/* Bootstrap CSS */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      
      <div className="d-flex flex-column min-vh-100">
        <Navbar 
          currentUser={currentUser}
          cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        
        <main className="flex-grow-1">
          {renderPage()}
        </main>
        
        <Footer onNavigate={handleNavigate}/>
        <CookieConsent onNavigate={handleNavigate}/>
      </div>

      {/* Bootstrap JS */}
      <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
      ></script>
    </>
  );
}
