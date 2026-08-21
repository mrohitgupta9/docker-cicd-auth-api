import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalScans: 1284,
    threatsFlagged: 342,
    communityReports: 89,
  });
  const [loading, setLoading] = useState(false);

  // Real-time Activity Mock Data
  const recentActivities = [
    { id: 1, type: 'URL Scan', target: 'http://phishing-fake-bank.login-verify.com', status: 'MALICIOUS', time: '2 mins ago' },
    { id: 2, type: 'Report', target: '+91 98765 43210', status: 'SUSPICIOUS', time: '12 mins ago' },
    { id: 3, type: 'URL Scan', target: 'https://github.com/official-repo', status: 'SAFE', time: '25 mins ago' },
    { id: 4, type: 'DB Lookup', target: 'support@crypto-free-airdrop.xyz', status: 'MALICIOUS', time: '1 hour ago' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111827] via-[#1E293B] to-[#111827] border border-[#1E293B] p-6 rounded-2xl shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div>
          <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-1 rounded-full uppercase tracking-widest">
            LIVE MONITORING
          </span>
          <h2 className="text-xl font-extrabold text-white mt-2">Threat Intelligence Control Center</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time threat detection and community-driven scammer database.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></div>
          <span className="text-xs font-semibold text-emerald-400">System Active</span>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-[#111827] border border-[#1E293B] p-6 rounded-2xl shadow-xl hover:border-cyan-500/40 transition-all duration-300 relative group overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Scans</div>
              <div className="text-3xl font-extrabold text-white mt-2 group-hover:text-cyan-400 transition">
                {stats.totalScans.toLocaleString()}
              </div>
            </div>
            <div className="w-10 h-10 bg-cyan-950 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 text-lg shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              🔍
            </div>
          </div>
          <div className="mt-4 flex items-center text-[11px] text-cyan-400 font-medium">
            <span>↑ 12% increase from last week</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#111827] border border-[#1E293B] p-6 rounded-2xl shadow-xl hover:border-red-500/40 transition-all duration-300 relative group overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Threats Flagged</div>
              <div className="text-3xl font-extrabold text-white mt-2 group-hover:text-red-400 transition">
                {stats.threatsFlagged.toLocaleString()}
              </div>
            </div>
            <div className="w-10 h-10 bg-red-950 border border-red-500/30 rounded-xl flex items-center justify-center text-red-400 text-lg shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              ⚠️
            </div>
          </div>
          <div className="mt-4 flex items-center text-[11px] text-red-400 font-medium">
            <span>Critical alerts active</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#111827] border border-[#1E293B] p-6 rounded-2xl shadow-xl hover:border-amber-500/40 transition-all duration-300 relative group overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Community Reports</div>
              <div className="text-3xl font-extrabold text-white mt-2 group-hover:text-amber-400 transition">
                {stats.communityReports.toLocaleString()}
              </div>
            </div>
            <div className="w-10 h-10 bg-amber-950 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400 text-lg shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              🚨
            </div>
          </div>
          <div className="mt-4 flex items-center text-[11px] text-amber-400 font-medium">
            <span>Verified entries</span>
          </div>
        </div>
      </div>

      {/* Quick Tools Panel */}
      <div className="bg-[#111827] border border-[#1E293B] p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            ⚡ Quick Execution Panel
          </h3>
          <p className="text-xs text-slate-400 mt-1">Directly analyze suspicious links or search identity records in database.</p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/scanner')} 
            className="flex-1 sm:flex-initial bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] font-bold px-5 py-3 rounded-xl text-xs transition shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer active:scale-95 flex items-center justify-center gap-2"
          >
            <span>🔗</span> URL Scanner
          </button>
          
          <button 
            onClick={() => navigate('/database')} 
            className="flex-1 sm:flex-initial bg-amber-500 hover:bg-amber-400 text-[#0B0F19] font-bold px-5 py-3 rounded-xl text-xs transition shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer active:scale-95 flex items-center justify-center gap-2"
          >
            <span>🛡️</span> Scammer DB
          </button>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl shadow-xl overflow-hidden">
        <div className="p-5 border-b border-[#1E293B] flex justify-between items-center">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            📡 Live Threat Stream
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">UPDATED REALTIME</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0B0F19]/50 border-b border-[#1E293B] text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                <th className="p-4">Action Type</th>
                <th className="p-4">Target Payload</th>
                <th className="p-4">Verdict</th>
                <th className="p-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B] text-xs">
              {recentActivities.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition">
                  <td className="p-4 font-medium text-slate-300">{item.type}</td>
                  <td className="p-4 font-mono text-slate-400 max-w-xs truncate">{item.target}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      item.status === 'MALICIOUS' ? 'bg-red-950 text-red-400 border border-red-500/30' :
                      item.status === 'SUSPICIOUS' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                      'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right text-slate-500 text-[11px]">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}