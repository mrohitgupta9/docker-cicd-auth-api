import React, { useState } from 'react';

export default function Signup({ onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          onSwitchToLogin();
        }, 1500);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Cannot connect to backend server. Check port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-[#1E293B] p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-cyan-950 border border-cyan-500/40 rounded-xl flex items-center justify-center text-cyan-400 text-2xl mx-auto mb-3 shadow-[0_0_15px_rgba(6,182,212,0.35)]">
            🛡️
          </div>
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-xs text-slate-400 mt-1">Join CyberSafe Threat Intelligence Platform</p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/50 border border-red-500/50 rounded-xl text-red-400 text-xs text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-emerald-950/50 border border-emerald-500/50 rounded-xl text-emerald-400 text-xs text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Rohit Kumar"
              className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="analyst@cybersafe.io"
              className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] font-bold py-3 rounded-xl text-sm transition shadow-[0_0_15px_rgba(6,182,212,0.35)] cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-xs text-slate-400">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="text-cyan-400 font-semibold hover:underline cursor-pointer">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}