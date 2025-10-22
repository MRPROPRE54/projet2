// Utilitaires d'authentification (simulé)

const AUTH_KEY = 'monmiammiam_user';

export const authService = {
  // Connexion
  login: (email, password, users) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const userSession = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        location: user.location,
        loyaltyPoints: user.loyaltyPoints,
        referralCode: user.referralCode
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(userSession));
      return { success: true, user: userSession };
    }
    return { success: false, error: "Email ou mot de passe incorrect" };
  },

  // Inscription
  register: (userData, users) => {
    // Vérifier si l'email existe déjà
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: "Cet email est déjà utilisé" };
    }

    // Validation du mot de passe (au moins une majuscule et un chiffre)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(userData.password)) {
      return { 
        success: false, 
        error: "Le mot de passe doit contenir au moins une majuscule et un chiffre" 
      };
    }

    // Créer un nouveau utilisateur
    const newUser = {
      id: users.length + 1,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'student',
      phone: userData.phone,
      location: userData.location,
      loyaltyPoints: 0,
      referralCode: generateReferralCode(userData.name),
      totalOrders: 0,
      totalSpent: 0
    };

    // Ajouter les points de parrainage si un code a été utilisé
    if (userData.referralCode) {
      newUser.loyaltyPoints += 10; // Bonus pour le nouveau membre
    }

    const userSession = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone,
      location: newUser.location,
      loyaltyPoints: newUser.loyaltyPoints,
      referralCode: newUser.referralCode
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(userSession));
    return { success: true, user: userSession };
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  // Récupérer l'utilisateur connecté
  getCurrentUser: () => {
    const userStr = localStorage.getItem(AUTH_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  // Vérifier si connecté
  isAuthenticated: () => {
    return localStorage.getItem(AUTH_KEY) !== null;
  },

  // Mettre à jour l'utilisateur dans le localStorage
  updateUser: (userData) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
  }
};

// Générer un code de parrainage unique
function generateReferralCode(name) {
  const namePart = name.split(' ')[0].toUpperCase().substring(0, 4);
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `${namePart}${randomPart}`;
}

// Vérifier le rôle de l'utilisateur
export const hasRole = (user, allowedRoles) => {
  if (!user) return false;
  return allowedRoles.includes(user.role);
};

// Calcul des points de fidélité
export const calculateLoyaltyPoints = (amount) => {
  // 1000F = 1 point
  return Math.floor(amount / 1000);
};

// Conversion des points en réduction
export const pointsToDiscount = (points) => {
  // 15 points = 1000F de réduction
  return Math.floor(points / 15) * 1000;
};

// Valider le format email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Valider le mot de passe
export const validatePassword = (password) => {
  // Au moins une majuscule et un chiffre
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};
