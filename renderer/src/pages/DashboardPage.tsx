import { useMemo } from "react";
import StatCard from "../components/ui/StatCard";
import SectionHeader from "../components/ui/SectionHeader";
import AnimatedPage from "../components/ui/AnimatedPage";
import DashboardScene from "../scenes/DashboardScene";
import { useTaskStore } from "../store/useTaskStore";
import { useProgressStore } from "../store/useProgressStore";

function getTodayDateString() {
  return new Date().toISOString().split("T")[0];
}

export default function DashboardPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const daily = useProgressStore((state) => state.daily);
  const streakCount = useProgressStore((state) => state.streakCount);

  const todayProgress = useMemo(() => {
    const today = getTodayDateString();
    return (
      daily.find((entry) => entry.date === today) ?? {
        date: today,
        focusMinutes: 0,
        focusSessionsCompleted: 0,
        tasksCompleted: 0,
      }
    );
  }, [daily]);

  const totalTasks = tasks.length;
  const todoTasks = tasks.filter((task) => task.status === "Todo").length;
  const doneTasks = tasks.filter((task) => task.status === "Done").length;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High" && task.status === "Todo"
  ).length;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  return (
    <AnimatedPage>
      <SectionHeader
        label="Dashboard"
        title="Welcome to StudyOS"
        subtitle="Plan your work, stay focused, track your progress, and build consistency every day."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Focus Today"
          value={`${todayProgress.focusMinutes} min`}
          hint={`${todayProgress.focusSessionsCompleted} session(s) completed`}
          variant="cyan"
        />
        <StatCard
          title="Tasks Done Today"
          value={String(todayProgress.tasksCompleted)}
          hint="Daily completion count"
        />
        <StatCard
          title="Current Streak"
          value={`${streakCount} day${streakCount === 1 ? "" : "s"}`}
          hint="Active productivity streak"
          variant="violet"
        />
        <StatCard
          title="High Priority"
          value={String(highPriorityTasks)}
          hint="Urgent pending items"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-white">Today’s Overview</h2>
          <p className="mt-2 text-sm text-slate-300">
            Your dashboard now combines live task metrics with daily focus analytics and streak tracking.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Pending Work</p>
              <p className="mt-2 text-2xl font-semibold text-white">{todoTasks}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Completed Work</p>
              <p className="mt-2 text-2xl font-semibold text-white">{doneTasks}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Focus Sessions Today</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {todayProgress.focusSessionsCompleted}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Completion Rate</p>
              <p className="mt-2 text-2xl font-semibold text-white">{completionRate}%</p>
            </div>
          </div>

          <div className="mt-6 h-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
            <DashboardScene />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-white">Quick Actions</h2>

          <div className="mt-5 grid gap-3">
            {[
              `Add Task (${totalTasks})`,
              `Pending Tasks (${todoTasks})`,
              `Focus Today (${todayProgress.focusMinutes} min)`,
              "Open AI Studio",
            ].map((item) => (
              <button
                key={item}
                className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-violet-400/40 hover:bg-slate-800"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}