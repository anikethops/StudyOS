export default function FocusPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300/80">Focus</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Deep Work Mode</h1>
        <p className="mt-2 text-sm text-slate-400">
          Your Pomodoro timer, focus sessions, and immersive work environment will live here.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_0.7fr]">
        <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-6 shadow-2xl">
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-950/40">
            <div className="flex h-44 w-44 items-center justify-center rounded-full border border-cyan-300/30 text-4xl font-semibold text-white shadow-[0_0_60px_rgba(56,189,248,0.15)]">
              25:00
            </div>
            <p className="mt-6 text-sm text-slate-400">Timer ring and focus controls placeholder</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
          <h2 className="text-lg font-semibold text-white">Session Stats</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="rounded-xl bg-slate-900/60 p-4">Focus sessions today: 0</div>
            <div className="rounded-xl bg-slate-900/60 p-4">Total focus minutes: 0</div>
            <div className="rounded-xl bg-slate-900/60 p-4">Current mode: Focus</div>
          </div>
        </div>
      </div>
    </div>
  );
}