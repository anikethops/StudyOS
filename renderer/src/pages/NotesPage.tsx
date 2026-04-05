export default function NotesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300/80">Notes</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Knowledge Capture</h1>
        <p className="mt-2 text-sm text-slate-400">
          Capture quick notes, summaries, and ideas for your learning workflow.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.35fr_0.65fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl">
          <p className="text-sm font-medium text-white">Notes List</p>
          <div className="mt-4 rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-500">
            Notes list placeholder
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl">
          <p className="text-sm font-medium text-white">Editor</p>
          <div className="mt-4 min-h-[320px] rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-500">
            Notes editor placeholder
          </div>
        </div>
      </div>
    </div>
  );
}