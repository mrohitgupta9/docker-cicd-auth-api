import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  // Navigation Items Structure
  const menuGroups = [
    {
      groupLabel: 'MONITORING',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: '📊', badge: 'Live' },
      ],
    },
    {
      groupLabel: 'SECURITY SUITE',
      items: [
        {
          label: 'Threat Scanner',
          icon: '🔗',
          id: 'scanner-menu',
          children: [
            { path: '/scanner', label: 'URL Scanner', icon: '🔍' },
            { path: '/scanner/ip', label: 'IP Intelligence', icon: '🌐', badge: 'PRO' },
            { path: '/scanner/files', label: 'File Hash Check', icon: '📁' },
          ],
        },
        {
          label: 'Scammer Database',
          icon: '🚨',
          id: 'database-menu',
          children: [
            { path: '/database', label: 'Search Identity', icon: '🔎' },
            { path: '/database/report', label: 'Report Incident', icon: '📝', badge: 'NEW' },
          ],
        },
      ],
    },
    {
      groupLabel: 'SYSTEM',
      items: [
        { path: '/analytics', label: 'Analytics & Logs', icon: '📈' },
        { path: '/settings', label: 'Settings', icon: '⚙️' },
      ],
    },
  ];

  // Toggle dropdown state
  const toggleSubmenu = (menuId) => {
    setOpenMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar Drawer */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-[#0B0F19] border-r border-[#1E293B] flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-[#1E293B]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-cyan-950 border border-cyan-500/30 rounded-xl flex items-center justify-center text-[#0B0F19] bg-gradient-to-tr from-cyan-400 to-blue-500 font-black text-sm">
                🛡️
              </div>
              <span className="font-extrabold text-white text-base tracking-wider">
                CYBER<span className="text-cyan-400">SAFE</span>
              </span>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white text-lg p-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
          {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                {group.groupLabel}
              </p>

              <div className="space-y-1">
                {group.items.map((item, itemIdx) => {
                  if (item.children) {
                    const isParentActive = item.children.some(
                      (child) => location.pathname === child.path
                    );
                    const isMenuOpen = openMenus[item.id] || isParentActive;

                    return (
                      <div key={item.id} className="space-y-1">
                        {/* Parent Dropdown Button */}
                        <button
                          onClick={() => toggleSubmenu(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                            isParentActive || isMenuOpen
                              ? 'bg-slate-800/80 text-cyan-400 border border-slate-700/50'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">{item.icon}</span>
                            <span>{item.label}</span>
                          </div>

                          <span
                            className={`text-[10px] transition-transform duration-200 ${
                              isMenuOpen ? 'rotate-180' : ''
                            }`}
                          >
                            ▼
                          </span>
                        </button>

                        {/* Dropdown Children */}
                        {isMenuOpen && (
                          <div className="pl-6 space-y-1 border-l-2 border-[#1E293B] ml-4 my-1">
                            {item.children.map((child) => (
                              <NavLink
                                key={child.path}
                                to={child.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                  `flex items-center justify-between px-3 py-2 rounded-lg transition text-xs font-medium ${
                                    isActive
                                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 font-bold'
                                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                                  }`
                                }
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">{child.icon}</span>
                                  <span>{child.label}</span>
                                </div>
                                {child.badge && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-bold">
                                    {child.badge}
                                  </span>
                                )}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Single NavLink
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2.5 rounded-xl transition text-xs font-semibold ${
                          isActive
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-bold'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Widget */}
        <div className="p-3 border-t border-[#1E293B]">
          <div className="bg-[#111827] border border-[#1E293B] p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <div>
                <div className="text-[11px] font-bold text-white">Shield Node</div>
                <div className="text-[9px] text-slate-400 font-mono">v2.4.0 • ONLINE</div>
              </div>
            </div>
            <span className="text-xs">🔒</span>
          </div>
        </div>
      </aside>
    </>
  );
}