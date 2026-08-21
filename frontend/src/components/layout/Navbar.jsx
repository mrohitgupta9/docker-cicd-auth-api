import React from 'react';

export default function Navbar({ user, onLogout }) {
  return (
    <header className="bg-[#111827] border-b border-[#1E293B] px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold text-white flex items-center gap-2">
          🛡️ CyberSafe Suite
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-xs text-right">
          <div className="font-bold text-white">{user?.name || 'Security Analyst'}</div>
          <div className="text-emerald-400 flex items-center gap-1 justify-end">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            Authenticated
          </div>
        </div>

        <button
          onClick={onLogout}
          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
}