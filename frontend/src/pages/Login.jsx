import React, { useState } from 'react';
import { loginUser } from '../api/authService';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      <input 
        type="email" 
        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
        placeholder="Password" 
      />
      <button type="submit">Login</button>
    </form>
  );
}