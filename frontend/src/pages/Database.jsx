import React, { useState } from 'react';

export default function Database({ token }) {
  const [query, setQuery] = useState('9876543210');
  const [searchResult, setSearchResult] = useState(null);
  const [reportType, setReportType] = useState('PHONE');
  const [reportVal, setReportVal] = useState('');
  const [reportDesc, setReportDesc] = useState('');

  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/cyber/check-spam?query=${encodeURIComponent(query)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setSearchResult(data);
    } catch (err) {
      alert('Error searching database');
    }
  };

  const handleReport = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/cyber/report-threat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ type: reportType, value: reportVal, description: reportDesc })
      });
      if (res.ok) {
        alert('Threat Report Logged Successfully!');
        setReportVal('');
        setReportDesc('');
      }
    } catch (err) {
      alert('Error submitting report');
    }
  };

  return (
    <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 shadow-xl space-y-6 max-w-3xl mx-auto">
      <h2 className="text-lg font-bold text-white">🚨 Scammer Search & Community Reporting</h2>
      
      <div className="space-y-2">
        <label className="text-xs text-slate-400 block">Check Phone / UPI / URL</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            className="flex-1 bg-[#0B0F19] border border-[#1E293B] rounded-xl p-3 text-sm text-amber-300 focus:outline-none" 
          />
          <button onClick={handleSearch} className="bg-amber-500 hover:bg-amber-400 text-[#0B0F19] font-bold px-5 py-3 rounded-xl text-sm cursor-pointer">
            Search
          </button>
        </div>

        {searchResult && (
          <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-950/30 text-amber-300 text-sm mt-3 flex justify-between items-center">
            <div>
              <div className="font-bold">{searchResult.status || 'SPAMMER DETECTED'}</div>
              <div className="text-xs">{searchResult.message || 'Entity associated with fraud'}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">{searchResult.totalReports || 0}</div>
              <div className="text-[10px] text-slate-400">Reports</div>
            </div>
          </div>
        )}
      </div>

      <hr className="border-[#1E293B]" />

      <form onSubmit={handleReport} className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase">Submit Incident Report</h3>
        <div className="grid grid-cols-2 gap-2">
          <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="bg-[#0B0F19] border border-[#1E293B] rounded-xl p-2.5 text-xs text-white">
            <option value="PHONE">PHONE NUMBER</option>
            <option value="UPI">UPI ID</option>
            <option value="URL">URL LINK</option>
          </select>
          <input type="text" required value={reportVal} onChange={(e) => setReportVal(e.target.value)} placeholder="Value" className="bg-[#0B0F19] border border-[#1E293B] rounded-xl p-2.5 text-xs text-white" />
        </div>
        <input type="text" required value={reportDesc} onChange={(e) => setReportDesc(e.target.value)} placeholder="Description" className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-xl p-2.5 text-xs text-white" />
        <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] font-bold py-3 rounded-xl text-sm cursor-pointer">Submit Report</button>
      </form>
    </div>
  );
}