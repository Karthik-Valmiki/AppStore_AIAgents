import api from './api';

export const authService = {
  async login(username, password) {
    try {
      console.log('Attempting login with:', { username });
      const { data } = await api.post('/auth/login/', { username, password });
      console.log('Login response:', data);
      
      if (data.access_token && data.user) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Login successful, tokens stored');
        return data;
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  async register(userData) {
    try {
      console.log('Attempting registration with:', { ...userData, password: '***' });
      const { data } = await api.post('/auth/register/', userData);
      console.log('Registration successful:', data);
      return data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  },

  logout() {
    console.log('Logging out...');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  isAuthenticated() {
    const hasToken = !!localStorage.getItem('access_token');
    console.log('Is authenticated:', hasToken);
    return hasToken;
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    const parsed = user ? JSON.parse(user) : null;
    console.log('Current user:', parsed);
    return parsed;
  },
};
