import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalScans: 1284,
    threatsFlagged: 342,
    communityReports: 89,
  });

  // Recent Activity Stream State
  const [recentActivities] = useState([
    { id: 1, type: 'URL Scan', target: 'http://phishing-fake-bank.login-verify.com', status: 'MALICIOUS', time: '2 mins ago' },
    { id: 2, type: 'Report', target: '+91 98765 43210', status: 'SUSPICIOUS', time: '12 mins ago' },
    { id: 3, type: 'URL Scan', target: 'https://github.com/official-repo', status: 'SAFE', time: '25 mins ago' },
    { id: 4, type: 'DB Lookup', target: 'support@crypto-free-airdrop.xyz', status: 'MALICIOUS', time: '1 hour ago' },
  ]);

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 font-sans selection:bg-cyan-500/30">
      
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full uppercase tracking-widest shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Live Threat Engine Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
              Threat Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Control Center</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-xl">
              Real-time cyber threat analytics, automated phishing detection, and community scammer database.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/60 border border-slate-800 px-4 py-2.5 rounded-2xl shadow-inner">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-200 tracking-wide">SYSTEM OK</span>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Scans */}
        <div className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 p-6 rounded-3xl shadow-xl transition-all duration-300 backdrop-blur-md group relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Scans</p>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 group-hover:text-cyan-400 transition-colors">
                {stats.totalScans.toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 bg-cyan-950/80 border border-cyan-500/30 rounded-2xl flex items-center justify-center text-cyan-400 text-xl shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:scale-110 transition-transform">
              🔍
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-cyan-400 font-medium">
            <span>↑ 12% increase from last week</span>
          </div>
        </div>

        {/* Threats Flagged */}
        <div className="bg-slate-900/60 border border-slate-800 hover:border-red-500/40 p-6 rounded-3xl shadow-xl transition-all duration-300 backdrop-blur-md group relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Threats Flagged</p>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 group-hover:text-red-400 transition-colors">
                {stats.threatsFlagged.toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 bg-red-950/80 border border-red-500/30 rounded-2xl flex items-center justify-center text-red-400 text-xl shadow-[0_0_20px_rgba(239,68,68,0.15)] group-hover:scale-110 transition-transform">
              ⚠️
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-red-400 font-medium">
            <span>Critical alerts flagged</span>
          </div>
        </div>

        {/* Community Reports */}
        <div className="bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 p-6 rounded-3xl shadow-xl transition-all duration-300 backdrop-blur-md group relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Community Reports</p>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 group-hover:text-amber-400 transition-colors">
                {stats.communityReports.toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 bg-amber-950/80 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 text-xl shadow-[0_0_20px_rgba(245,158,11,0.15)] group-hover:scale-110 transition-transform">
              🚨
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-amber-400 font-medium">
            <span>Verified user reports</span>
          </div>
        </div>

      </div>

      {/* 3. Action Hub */}
      <div className="bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            ⚡ Quick Execution Panel
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Execute real-time link diagnostics or search suspicious entities in the registry.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button 
            onClick={() => navigate('/scanner')} 
            className="flex-1 sm:flex-initial bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] active:scale-95 flex items-center justify-center gap-2"
          >
            <span>🔗</span> Open URL Scanner
          </button>
          
          <button 
            onClick={() => navigate('/database')} 
            className="flex-1 sm:flex-initial bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold px-6 py-3 rounded-2xl text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>🛡️</span> Search Scammer DB
          </button>
        </div>
      </div>

      {/* 4. Live Threat Stream Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            📡 Live Threat Stream
          </h2>
          <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/20">
            AUTO-SYNCED
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                <th className="p-4 sm:px-6">Action Type</th>
                <th className="p-4 sm:px-6">Target Payload</th>
                <th className="p-4 sm:px-6">Verdict</th>
                <th className="p-4 sm:px-6 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {recentActivities.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 sm:px-6 font-medium text-slate-200">{item.type}</td>
                  <td className="p-4 sm:px-6 font-mono text-slate-400 max-w-xs truncate">{item.target}</td>
                  <td className="p-4 sm:px-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block ${
                      item.status === 'MALICIOUS' ? 'bg-red-950/80 text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]' :
                      item.status === 'SUSPICIOUS' ? 'bg-amber-950/80 text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]' :
                      'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 sm:px-6 text-right text-slate-500 text-[11px] font-mono">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}