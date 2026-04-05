import SectionHeader from "../components/ui/SectionHeader";
import { useProgressStore } from "../store/useProgressStore";

export default function ProgressPage() {
  const daily = useProgressStore((state) => state.daily);
  const streakCount = useProgressStore((state) => state.streakCount);
  const todayProgress = useProgressStore((state) => state.getTodayProgress());

  const recentDays = [...daily]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 7);

  return (
    <div className="space-y-6">
      <SectionHeader
        label="Progress"
        title="Analytics & Growth"
        subtitle="Track your streak, focus consistency, task completions, and recent productivity patterns."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl">
          <p className="text-sm text-slate-400">Current Streak</p>
          <p className="mt-3 text-2xl font-semibold text-white">
            {streakCount} day{streakCount === 1 ? "" : "s"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl">
          <p className="text-sm text-slate-400">Focus Today</p>
          <p className="mt-3 text-2xl font-semibold text-white">
            {todayProgress.focusMinutes} min
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl">
          <p className="text-sm text-slate-400">Tasks Done Today</p>
          <p className="mt-3 text-2xl font-semibold text-white">
            {todayProgress.tasksCompleted}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-white">Recent Daily Activity</h2>

        <div className="mt-5 space-y-3">
          {recentDays.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-slate-500">
              No progress data yet. Complete a task or focus session to begin tracking.
            </div>
          ) : (
            recentDays.map((day) => (
              <div
                key={day.date}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{day.date}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Focus sessions: {day.focusSessionsCompleted}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-cyan-200">
                      Focus: {day.focusMinutes} min
                    </span>
                    <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-violet-200">
                      Tasks: {day.tasksCompleted}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}