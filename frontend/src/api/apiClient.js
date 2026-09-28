// API Client for CRAVIO Backend

const API_BASE_URL = 'http://localhost:3000/api';

export const apiClient = {
  // Auth API
  registerUser: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/auth/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  loginUser: async (credentials) => {
    const res = await fetch(`${API_BASE_URL}/auth/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  logoutUser: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/user/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return res.json();
  },

  registerFoodPartner: async (partnerData) => {
    const res = await fetch(`${API_BASE_URL}/auth/food-partner/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(partnerData),
    });
    return res.json();
  },

  loginFoodPartner: async (credentials) => {
    const res = await fetch(`${API_BASE_URL}/auth/food-partner/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  logoutFoodPartner: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/food-partner/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return res.json();
  },

  // Food Items API
  getFoodItems: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/food`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Failed to fetch food items');
      }
      return await res.json();
    } catch (err) {
      console.warn('Backend food fetch warning:', err.message);
      return { foodItems: [] };
    }
  },

  createFood: async (formData) => {
    const res = await fetch(`${API_BASE_URL}/food`, {
      method: 'POST',
      credentials: 'include',
      body: formData, // FormData contains video file and text fields
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || 'Food reel upload failed.');
    }
    return data;
  }
};
