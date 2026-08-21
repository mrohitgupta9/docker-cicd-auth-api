import React, { useState } from 'react';

export default function Scanner({ token }) {
  const [url, setUrl] = useState('http://claim-gift-free-money.com');
  const [result, setResult] = useState(null);

  const scanURL = async () => {
    try {
      const res = await fetch('/api/cyber/check-url', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('Failed to scan URL');
    }
  };

  return (
    <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 shadow-xl space-y-4 max-w-3xl mx-auto">
      <h2 className="text-lg font-bold text-white flex items-center gap-2">🔗 Phishing Link Scanner Module</h2>
      <p className="text-xs text-slate-400">Scan suspicious URLs against threat heuristic patterns in real-time.</p>
      
      <div className="flex gap-2">
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="http://claim-free-prize.com" 
          className="flex-1 bg-[#0B0F19] border border-[#1E293B] rounded-xl p-3 text-sm text-cyan-300 focus:outline-none"
        />
        <button 
          onClick={scanURL} 
          className="bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] font-bold px-5 py-3 rounded-xl text-sm shadow-[0_0_15px_rgba(6,182,212,0.35)] cursor-pointer"
        >
          Scan URL
        </button>
      </div>

      {result && (
        <div className={`p-4 rounded-xl border text-sm mt-4 ${
          result.status?.includes('DANGER') 
            ? 'border-red-500/40 bg-red-950/30 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.35)]' 
            : 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
        }`}>
          <div className="font-bold">{result.status}</div>
          <div className="text-xs mt-1">{result.message}</div>
        </div>
      )}
    </div>
  );
}