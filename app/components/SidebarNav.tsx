'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CHANNELS } from '../../lib/channels';

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5 py-2">
      {CHANNELS.map((ch) => {
        const isActive = pathname === `/guide/${ch.id}`;
        return (
          <Link
            key={ch.id}
            href={`/guide/${ch.id}`}
            className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition ${
              isActive
                ? 'bg-violet-900/30 font-semibold text-violet-300 border border-violet-500/40'
                : 'text-slate-400 hover:bg-slate-700/40 hover:text-slate-100 border border-transparent'
            }`}
          >
            <span className={`inline-flex shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${ch.color}`}>
              {ch.platform}
            </span>
            <span className="truncate">{ch.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
