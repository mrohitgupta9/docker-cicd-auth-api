import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authService';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerUser(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-md w-full backdrop-blur-xl relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">⚡</span>
          <h1 className="text-2xl font-black text-white tracking-wider">CYBER<span className="text-cyan-400">SAFE</span></h1>
        </div>

        <h2 className="text-xl font-bold text-white">Create Account</h2>
        <p className="text-xs text-slate-400 mt-1 mb-6">Join CyberSafe Threat Intelligence Portal</p>

        {error && (
          <div className="text-red-400 text-xs bg-red-950/60 border border-red-500/30 p-3 rounded-xl mb-5 flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full bg-slate-950/80 border border-slate-800 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              placeholder="name@cybersafe.io"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full bg-slate-950/80 border border-slate-800 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full bg-slate-950/80 border border-slate-800 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold py-3.5 rounded-xl text-xs transition shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95 cursor-pointer mt-2"
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-xs text-slate-400 mt-6 text-center">
          Already have an account? <Link to="/login" className="text-cyan-400 font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}