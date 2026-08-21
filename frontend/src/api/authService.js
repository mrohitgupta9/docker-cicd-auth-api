import api from './axios';

// User Login API Call
export const loginUser = async (credentials) => {
  // Returns the full Axios response object so caller (Login.jsx) gets response.data
  const response = await api.post('/auth/login', credentials);
  
  if (response.data && response.data.token) {
    localStorage.setItem('cybersafe_token', response.data.token);
    if (response.data.user) {
      localStorage.setItem('cybersafe_user', JSON.stringify(response.data.user));
    }
  }
  
  return response;
};

// User Registration API Call
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response;
};

// User Logout Procedure
export const logoutUser = () => {
  localStorage.removeItem('cybersafe_token');
  localStorage.removeItem('cybersafe_user');
  window.location.href = '/login';
};