import { SidebarNav } from '../components/SidebarNav';
import { ExportButton } from '../components/ExportButton';

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      {/* Top navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-700/60 bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="rounded bg-violet-600/30 px-2 py-0.5 text-[11px] font-semibold text-violet-300">키움증권</span>
            <h1 className="text-sm font-bold tracking-tight text-white">소재 제작 가이드</h1>
          </div>
          <ExportButton />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 shrink-0 overflow-y-auto border-r border-slate-700/50 bg-slate-900/50 px-2">
          <div className="pt-4 pb-1 px-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">매체 선택</p>
          </div>
          <SidebarNav />
          <div className="h-4" />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
