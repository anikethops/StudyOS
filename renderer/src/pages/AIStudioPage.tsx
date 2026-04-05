export default function AIStudioPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300/80">AI Studio</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Study Intelligence</h1>
        <p className="mt-2 text-sm text-slate-400">
          Generate study plans, summarize notes, and break down large tasks.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {["Study Plan", "Summarize Notes", "Task Breakdown", "Study Coach"].map((tool) => (
          <div
            key={tool}
            className="rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-5 shadow-xl"
          >
            <h2 className="text-lg font-semibold text-white">{tool}</h2>
            <p className="mt-2 text-sm text-slate-300">AI workflow placeholder</p>
          </div>
        ))}
      </div>
    </div>
  );
}