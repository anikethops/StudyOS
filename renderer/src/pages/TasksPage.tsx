export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300/80">Tasks</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Task Manager</h1>
        <p className="mt-2 text-sm text-slate-400">
          Manage your study tasks, priorities, and deadlines here.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
        <div className="flex flex-wrap gap-3">
          {["All", "Today", "Upcoming", "Completed"].map((tab) => (
            <button
              key={tab}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 hover:border-violet-400/40 hover:text-white"
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-500">
          Task list and editor will be built in the next milestone.
        </div>
      </div>
    </div>
  );
}