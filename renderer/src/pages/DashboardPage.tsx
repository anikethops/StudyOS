import StatCard from "../components/ui/StatCard";
import SectionHeader from "../components/ui/SectionHeader";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        label="Dashboard"
        title="Welcome to StudyOS"
        subtitle="Plan your work, stay focused, track your progress, and build consistency every day."
      />

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Focus Today" value="0 min" hint="Daily target: 120 min" variant="cyan" />
        <StatCard title="Tasks Due" value="0" hint="No pending tasks" />
        <StatCard title="Current Streak" value="0 days" hint="Start your streak today" variant="violet" />
        <StatCard title="Notes Created" value="0" hint="Capture your ideas" />
      </div>

      {/* Main Layout */}
      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        {/* Left Panel */}
        <div className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-white">Today’s Overview</h2>
          <p className="mt-2 text-sm text-slate-300">
            This will evolve into your main productivity panel — showing tasks, focus sessions, and insights.
          </p>

          <div className="mt-6 h-64 rounded-2xl border border-dashed border-white/10 bg-slate-950/40 flex items-center justify-center text-sm text-slate-500">
            Future: Smart Dashboard + 3D Visual Layer
          </div>
        </div>

        {/* Right Panel */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-white">Quick Actions</h2>

          <div className="mt-5 grid gap-3">
            {["Add Task", "Start Focus Session", "Create Note", "Open AI Studio"].map(
              (item) => (
                <button
                  key={item}
                  className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-violet-400/40 hover:bg-slate-800"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}