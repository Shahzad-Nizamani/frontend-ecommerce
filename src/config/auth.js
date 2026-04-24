import { buildApiUrl } from './api';

export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(buildApiUrl('/api/auth/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Login failed' }));
      throw new Error(error.detail || `Login failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  },

  signup: async (name, email, password) => {
    const response = await fetch(buildApiUrl('/api/auth/signup'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Signup failed' }));
      throw new Error(error.detail || `Signup failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  },

  logout: async () => {
    try {
      await fetch(buildApiUrl('/auth/logout'), {
        method: 'GET',
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
  },
};

// Local storage helpers for auth state
export const authStorage = {
  setToken: (token) => localStorage.setItem('auth_token', token),
  getToken: () => localStorage.getItem('auth_token'),
  removeToken: () => localStorage.removeItem('auth_token'),
  
  setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => localStorage.removeItem('user'),

  clear: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
};
