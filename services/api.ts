
import { Movie, UserAccount } from '../types';

// Simulasi Latensi Network agar terasa seperti real backend
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const DB_KEYS = {
  SERIES: 'dramacuan_series_db',
  USERS: 'dramacuan_users_db',
  ADMIN_TOKEN: 'dramacuan_admin_token'
};

// Initial Data jika database kosong
const INITIAL_USERS: UserAccount[] = [
  { id: '1', name: 'Admin Utama', email: 'admin@dramacuan.com', phone: '08111111111', coins: 999, plan: 'VIP', createdAt: '2025-11-01', isBlocked: false },
  { id: '2', name: 'Budi Santoso', email: 'budi@mail.com', phone: '-', coins: 50, plan: 'Premium', createdAt: '2025-11-20', isBlocked: false },
  { id: '3', name: 'Siti Aminah', email: '-', phone: '0812999888', coins: 10, plan: 'Free', createdAt: '2025-11-22', isBlocked: true },
];

const getStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const setStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Seeding DB jika pertama kali buka
if (!getStorage(DB_KEYS.SERIES)) setStorage(DB_KEYS.SERIES, []);
if (!getStorage(DB_KEYS.USERS)) setStorage(DB_KEYS.USERS, INITIAL_USERS);

export const api = {
  // --- AUTH ---
  login: async (credentials: any) => {
    await delay(800);
    // Hardcoded sesuai permintaan untuk admin login
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const token = 'fake-jwt-token-' + Date.now();
      localStorage.setItem(DB_KEYS.ADMIN_TOKEN, token);
      return { success: true, token };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  logout: () => {
    localStorage.removeItem(DB_KEYS.ADMIN_TOKEN);
  },

  checkAuth: () => {
    return !!localStorage.getItem(DB_KEYS.ADMIN_TOKEN);
  },

  // --- SERIES MANAGEMENT ---
  getSeries: async () => {
    await delay(500);
    return getStorage(DB_KEYS.SERIES) || [];
  },

  addSeries: async (data: any) => {
    await delay(1000);
    const series = getStorage(DB_KEYS.SERIES) || [];
    const newSeries = { 
      ...data, 
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    series.unshift(newSeries);
    setStorage(DB_KEYS.SERIES, series);
    return newSeries;
  },

  updateSeries: async (id: string, data: any) => {
    await delay(800);
    const series = getStorage(DB_KEYS.SERIES) || [];
    const updated = series.map((s: any) => s.id === id ? { ...s, ...data } : s);
    setStorage(DB_KEYS.SERIES, updated);
    return data;
  },

  deleteSeries: async (id: string) => {
    await delay(500);
    const series = getStorage(DB_KEYS.SERIES) || [];
    const filtered = series.filter((s: any) => s.id !== id);
    setStorage(DB_KEYS.SERIES, filtered);
    return { success: true };
  },

  // --- USER MANAGEMENT ---
  getUsers: async () => {
    await delay(600);
    return getStorage(DB_KEYS.USERS) || [];
  },

  toggleBlock: async (id: string, isBlocked: boolean) => {
    await delay(400);
    const users = getStorage(DB_KEYS.USERS) || [];
    const updated = users.map((u: UserAccount) => u.id === id ? { ...u, isBlocked } : u);
    setStorage(DB_KEYS.USERS, updated);
    return { success: true };
  }
};
