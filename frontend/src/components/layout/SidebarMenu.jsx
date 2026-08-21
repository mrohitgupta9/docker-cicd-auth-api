import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function SidebarMenu({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if any child route is currently active
  const hasSubmenu = item.children && item.children.length > 0;
  const isChildActive = hasSubmenu && item.children.some(child => location.pathname === child.path);

  if (hasSubmenu) {
    return (
      <div className="w-full space-y-1">
        {/* Parent Dropdown Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition text-sm font-medium cursor-pointer ${
            isChildActive || isOpen
              ? 'bg-slate-800/80 text-cyan-400 border border-slate-700/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </div>

          <div className="flex items-center gap-2">
            {item.badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                {item.badge}
              </span>
            )}
            <span className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </div>
        </button>

        {/* Submenu Children Items */}
        {isOpen && (
          <div className="pl-6 space-y-1 border-l-2 border-[#1E293B] ml-4 my-1">
            {item.children.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-lg transition text-xs font-medium ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">{child.icon}</span>
                  <span>{child.label}</span>
                </div>
                {child.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-950 text-red-400 border border-red-500/30">
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

  // Standard NavLink Item (No Submenu)
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `w-full flex items-center justify-between px-4 py-3 rounded-xl transition text-sm font-medium ${
          isActive
            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-bold'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
        }`
      }
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{item.icon}</span>
        <span>{item.label}</span>
      </div>

      {item.badge && (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30">
          {item.badge}
        </span>
      )}
    </NavLink>
  );
}