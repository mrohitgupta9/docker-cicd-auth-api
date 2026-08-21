import React from 'react';
import SidebarMenu from './SidebarMenu';

export default function SidebarItems() {
  const navigationStructure = [
    {
      category: 'MAIN ANALYTICS',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: '📊', badge: 'Live' },
      ],
    },
    {
      category: 'SECURITY SUITE',
      items: [
        {
          label: 'Threat Scanner',
          icon: '🔗',
          children: [
            { path: '/scanner', label: 'URL Scanner', icon: '🔍' },
            { path: '/scanner/ip', label: 'IP Intelligence', icon: '🌐', badge: 'PRO' },
          ],
        },
        {
          label: 'Scammer Database',
          icon: '🚨',
          children: [
            { path: '/database', label: 'Search Identity', icon: '🔎' },
            { path: '/database/report', label: 'Report Scammer', icon: '📝', badge: 'NEW' },
          ],
        },
      ],
    },
  ];

  return (
    <nav className="flex flex-col gap-5 w-full px-3">
      {navigationStructure.map((group, idx) => (
        <div key={idx} className="space-y-1.5">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            {group.category}
          </p>
          <div className="space-y-1">
            {group.items.map((item, itemIdx) => (
              <SidebarMenu key={item.path || itemIdx} item={item} />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}