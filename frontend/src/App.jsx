import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('cybersafe_token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('cybersafe_user')) || null);

  const handleLogin = (userToken, userData) => {
    localStorage.setItem('cybersafe_token', userToken);
    localStorage.setItem('cybersafe_user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('cybersafe_token');
    localStorage.removeItem('cybersafe_user');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AppRoutes
      token={token}
      user={user}
      onLogin={handleLogin}
      onLogout={handleLogout}
    />
  );
}