import api from './axios';

// User Login
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// User Registration
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// User Logout
export const logoutUser = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};