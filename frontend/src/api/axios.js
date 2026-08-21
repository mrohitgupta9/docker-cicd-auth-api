import axios from 'axios';

// Localhost replace karke direct Render URL default set kar do
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://docker-cicd-auth-api.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;