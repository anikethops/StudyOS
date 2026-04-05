import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  TimerReset,
  NotebookPen,
  BarChart3,
  Sparkles,
  Settings,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/focus", label: "Focus", icon: TimerReset },
  { to: "/notes", label: "Notes", icon: NotebookPen },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/ai-studio", label: "AI Studio", icon: Sparkles },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-[270px] flex-col border-r border-white/10 bg-slate-950/95 px-5 py-6 backdrop-blur-xl">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-violet-300/70">
          StudyOS
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-white">Workspace</h1>
        <p className="mt-2 text-sm text-slate-400">
          Focus. Learn. Build momentum.
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-white border border-violet-400/20 shadow-lg"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-4">
        <p className="text-sm font-medium text-white">Phase 1 Build</p>
        <p className="mt-2 text-xs leading-5 text-slate-300">
          Shell setup complete. Next we’ll wire state, tasks, notes, and progress.
        </p>
      </div>
    </aside>
  );
}