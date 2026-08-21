import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  const navigate = useNavigate();

  // Safe LocalStorage Parser for User Data
  const getStoredUser = () => {
    try {
      const storedUser = localStorage.getItem('cybersafe_user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      localStorage.removeItem('cybersafe_user');
      return null;
    }
  };

  const [token, setToken] = useState(() => localStorage.getItem('cybersafe_token') || null);
  const [user, setUser] = useState(getStoredUser);

  // Sync token state across browser tabs & sessions
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('cybersafe_token') || null);
      setUser(getStoredUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogin = (userToken, userData) => {
    localStorage.setItem('cybersafe_token', userToken);
    localStorage.setItem('cybersafe_user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem('cybersafe_token');
    localStorage.removeItem('cybersafe_user');
    setToken(null);
    setUser(null);
    navigate('/login', { replace: true });
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