import beignetsHaricotImage from '../assets/image/Beignets_Haricot.png';
import PouletDGImage from '../assets/image/Poulet_DG.png';
import PoissonBraiseImage from '../assets/image/Poisson_braisé.png';
import KokiImage from '../assets/image/Koki.png';
import NdoleImage from '../assets/image/Ndole.png';
import RizSauteImage from '../assets/image/Riz_sauté.png';
import PlantainFritImage from '../assets/image/Plantain_frit.png';

// Utilisateurs simulés
export const mockUsers = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@ucac-icam.com",
    password: "Pass123",
    role: "student",
    phone: "+237 690 123 456",
    location: "Résidence La Terrasse",
    loyaltyPoints: 45,
    referralCode: "JEAN2024",
    totalOrders: 28,
    totalSpent: 142000
  },
  {
    id: 2,
    name: "Marie Kamga",
    email: "marie.kamga@ucac-icam.com",
    password: "Pass123",
    role: "student",
    phone: "+237 691 234 567",
    location: "Campus UCAC",
    loyaltyPoints: 67,
    referralCode: "MARIE2024",
    totalOrders: 45,
    totalSpent: 225000
  },
  {
    id: 3,
    name: "Paul Nkosi",
    email: "paul.nkosi@zeduc.com",
    password: "Admin123",
    role: "employee",
    phone: "+237 692 345 678",
    location: null,
    loyaltyPoints: 0,
    referralCode: null,
    totalOrders: 0,
    totalSpent: 0
  },
  {
    id: 4,
    name: "Sophie Mbida",
    email: "sophie.mbida@zeduc.com",
    password: "Manager123",
    role: "manager",
    phone: "+237 693 456 789",
    location: null,
    loyaltyPoints: 0,
    referralCode: null,
    totalOrders: 0,
    totalSpent: 0
  },
  {
    id: 5,
    name: "Admin ZeDuc",
    email: "admin@zeduc.com",
    password: "Admin123",
    role: "admin",
    phone: "+237 694 567 890",
    location: null,
    loyaltyPoints: 0,
    referralCode: null,
    totalOrders: 0,
    totalSpent: 0
  }
];

// Menu items
export const mockMenuItems = [
  {
    id: 1,
    name: "Poulet DG",
    category: "Plats principaux",
    price: 3500,
    description: "Poulet sauté avec légumes et plantain",
    image: PouletDGImage,
    available: true,
    isSpecial: true
  },
  {
    id: 2,
    name: "Ndolé",
    category: "Plats principaux",
    price: 3000,
    description: "Ndolé aux arachides avec viande ou poisson",
    image: NdoleImage,
    available: true,
    isSpecial: false
  },
  {
    id: 3,
    name: "Koki",
    category: "Plats principaux",
    price: 2500,
    description: "Koki traditionnel avec huile de palme",
    image: KokiImage,
    available: true,
    isSpecial: false
  },
  {
    id: 4,
    name: "Poisson Braisé",
    category: "Plats principaux",
    price: 4000,
    description: "Poisson frais braisé avec accompagnement",
    image: PoissonBraiseImage,
    available: true,
    isSpecial: true
  },
  {
    id: 5,
    name: "Riz Sauté",
    category: "Plats principaux",
    price: 2000,
    description: "Riz sauté aux légumes et poulet",
    image: RizSauteImage,
    available: true,
    isSpecial: false
  },
  {
    id: 6,
    name: "Coca Cola",
    category: "Boissons",
    price: 500,
    description: "Coca Cola 33cl",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400",
    available: true,
    isSpecial: false
  },
  {
    id: 7,
    name: "Jus de Fruit",
    category: "Boissons",
    price: 1000,
    description: "Jus naturel (mangue, ananas, passion)",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
    available: true,
    isSpecial: false
  },
  {
    id: 8,
    name: "Eau Minérale",
    category: "Boissons",
    price: 300,
    description: "Eau minérale 50cl",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400",
    available: true,
    isSpecial: false
  },
  {
    id: 9,
    name: "Beignets Haricot",
    category: "Snacks",
    price: 1500,
    description: "Beignets haricot (portion de 5)",
    image: beignetsHaricotImage,
    available: true,
    isSpecial: false
  },
  {
    id: 10,
    name: "Plantain Frit",
    category: "Snacks",
    price: 1000,
    description: "Plantain mûr frit",
    image: PlantainFritImage,
    available: true,
    isSpecial: false
  }
];

// Commandes simulées
export const mockOrders = [
  {
    id: 1001,
    userId: 1,
    userName: "Jean Dupont",
    items: [
      { menuItemId: 1, name: "Poulet DG", quantity: 1, price: 3500 },
      { menuItemId: 6, name: "Coca Cola", quantity: 1, price: 500 }
    ],
    total: 4000,
    status: "completed",
    orderType: "delivery",
    deliveryTime: "12:30",
    location: "Résidence La Terrasse",
    comment: "Merci beaucoup, excellent !",
    pointsEarned: 4,
    createdAt: "2024-10-12T11:30:00",
    completedAt: "2024-10-12T12:30:00"
  },
  {
    id: 1002,
    userId: 2,
    userName: "Marie Kamga",
    items: [
      { menuItemId: 2, name: "Ndolé", quantity: 2, price: 3000 },
      { menuItemId: 7, name: "Jus de Fruit", quantity: 2, price: 1000 }
    ],
    total: 8000,
    status: "pending",
    orderType: "on-site",
    deliveryTime: "13:00",
    location: null,
    comment: null,
    pointsEarned: 8,
    createdAt: "2024-10-13T12:15:00",
    completedAt: null
  },
  {
    id: 1003,
    userId: 1,
    userName: "Jean Dupont",
    items: [
      { menuItemId: 4, name: "Poisson Braisé", quantity: 1, price: 4000 },
      { menuItemId: 10, name: "Plantain Frit", quantity: 1, price: 1000 }
    ],
    total: 5000,
    status: "preparing",
    orderType: "delivery",
    deliveryTime: "14:00",
    location: "Résidence La Terrasse",
    comment: null,
    pointsEarned: 5,
    createdAt: "2024-10-13T13:20:00",
    completedAt: null
  }
];

// Réclamations
export const mockComplaints = [
  {
    id: 501,
    userId: 1,
    userName: "Jean Dupont",
    orderId: 1001,
    subject: "Retard de livraison",
    description: "Ma commande est arrivée avec 20 minutes de retard",
    status: "resolved",
    response: "Nous nous excusons pour ce retard. Vos 15 points de fidélité ont été ajoutés en compensation.",
    createdAt: "2024-10-12T13:00:00",
    resolvedAt: "2024-10-12T14:30:00"
  },
  {
    id: 502,
    userId: 2,
    userName: "Marie Kamga",
    orderId: null,
    subject: "Question sur le menu",
    description: "Est-ce que le Ndolé peut être préparé sans viande ?",
    status: "pending",
    response: null,
    createdAt: "2024-10-13T10:00:00",
    resolvedAt: null
  }
];

// Promotions et événements
export const mockPromotions = [
  {
    id: 1,
    title: "Happy Hour",
    description: "20% de réduction sur toutes les boissons de 15h à 17h",
    type: "promotion",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600",
    startDate: "2024-10-01",
    endDate: "2024-10-31",
    active: true
  },

  {
    id: 2,
    title: "Match Champions League",
    description: "Soirée spéciale ce mercredi - Menu à 5000F",
    type: "event",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600",
    startDate: "2024-10-16",
    endDate: "2024-10-16",
    active: true
  },
  {
    id: 3,
    title: "Parrainage Bonus",
    description: "Double points pour chaque filleul ce mois-ci !",
    type: "promotion",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
    startDate: "2024-10-01",
    endDate: "2024-10-31",
    active: true
  }
];

// Top clients (pour le classement)
export const mockTopClients = [
  { id: 2, name: "Marie Kamga", totalOrders: 45, totalSpent: 225000, avatar: "MK" },
  { id: 6, name: "Pierre Owona", totalOrders: 38, totalSpent: 198000, avatar: "PO" },
  { id: 7, name: "Claire Tchoupo", totalOrders: 35, totalSpent: 187000, avatar: "CT" },
  { id: 1, name: "Jean Dupont", totalOrders: 28, totalSpent: 142000, avatar: "JD" },
  { id: 8, name: "André Salomo", totalOrders: 25, totalSpent: 135000, avatar: "AS" },
  { id: 9, name: "Fatima Ngo", totalOrders: 23, totalSpent: 128000, avatar: "FN" },
  { id: 10, name: "Victor Essomba", totalOrders: 21, totalSpent: 115000, avatar: "VE" },
  { id: 11, name: "Isabelle Meka", totalOrders: 19, totalSpent: 98000, avatar: "IM" },
  { id: 12, name: "Thomas Manga", totalOrders: 17, totalSpent: 89000, avatar: "TM" },
  { id: 13, name: "Sylvie Ateba", totalOrders: 15, totalSpent: 78000, avatar: "SA" }
];

// Statistiques
export const mockStats = {
  today: {
    orders: 12,
    revenue: 48000,
    pendingOrders: 3
  },
  week: {
    orders: 87,
    revenue: 348000,
    topItems: ["Poulet DG", "Ndolé", "Poisson Braisé"]
  },
  month: {
    orders: 342,
    revenue: 1368000,
    newUsers: 23,
    loyaltyPointsUsed: 156
  }
};

// Mini-jeux
export const mockGames = [
  {
    id: 1,
    title: "Roue de la Chance",
    description: "Tournez la roue et gagnez jusqu'à 50 points !",
    type: "wheel",
    cost: 10,
    active: true
  },
  {
    id: 2,
    title: "Quiz du Chef",
    description: "Répondez correctement et gagnez 20 points",
    type: "quiz",
    cost: 5,
    active: true
  }
];
