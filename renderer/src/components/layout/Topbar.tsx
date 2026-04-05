import { Search, Bell, MoonStar } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-white/10 bg-slate-950/60 px-8 py-5 backdrop-blur-xl">
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          type="text"
          placeholder="Search tasks, notes, plans..."
          className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-violet-400/40"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-violet-400/30 hover:text-white">
          <MoonStar size={18} />
        </button>
        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-violet-400/30 hover:text-white">
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-semibold text-white">
            A
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-white">Aniket</p>
            <p className="text-xs text-slate-400">Builder Mode</p>
          </div>
        </div>
      </div>
    </header>
  );
}