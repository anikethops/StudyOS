export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300/80">Progress</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Analytics & Growth</h1>
        <p className="mt-2 text-sm text-slate-400">
          Track streaks, goals, completed tasks, and your overall consistency.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {["Streak", "Daily Goal", "Tasks Done"].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl"
          >
            <p className="text-sm text-slate-400">{item}</p>
            <p className="mt-3 text-2xl font-semibold text-white">0</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
        <div className="h-72 rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-sm text-slate-500">
          Charts and milestone system placeholder
        </div>
      </div>
    </div>
  );
}