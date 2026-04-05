import SectionHeader from "../components/ui/SectionHeader";
import { useFocusStore } from "../store/useFocusStore";
import useFocusTimer from "../hooks/useFocusTimer";
import { formatTime } from "../utils/formatTime";
import { motion } from "framer-motion";

const modes = ["Focus", "Short Break", "Long Break"] as const;

export default function FocusPage() {
  const mode = useFocusStore((state) => state.mode);
  const isRunning = useFocusStore((state) => state.isRunning);
  const remainingSeconds = useFocusStore((state) => state.remainingSeconds);
  const sessions = useFocusStore((state) => state.sessions);
  const setMode = useFocusStore((state) => state.setMode);
  const startTimer = useFocusStore((state) => state.startTimer);
  const pauseTimer = useFocusStore((state) => state.pauseTimer);
  const resetTimer = useFocusStore((state) => state.resetTimer);

  useFocusTimer();

  const totalFocusSessions = sessions.filter((s) => s.mode === "Focus").length;
  const totalFocusMinutes = Math.floor(
    sessions
      .filter((s) => s.mode === "Focus")
      .reduce((acc, session) => acc + session.durationSeconds, 0) / 60
  );

  return (
    <div className="space-y-8">
      <SectionHeader
        label="Focus"
        title="Deep Work Mode"
        subtitle="Run structured focus sessions, take breaks intentionally, and build better study rhythm."
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_0.7fr]">
        <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-6 shadow-2xl">
          <div className="mb-5 flex flex-wrap gap-3">
            {modes.map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={`rounded-full border px-4 py-2 text-sm transition ${mode === item
                  ? "border-cyan-400/40 bg-cyan-500/20 text-white"
                  : "border-white/10 text-slate-300 hover:border-cyan-400/30 hover:text-white"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-950/40">
            <motion.div
              animate={
                isRunning
                  ? { scale: [1, 1.03, 1] }
                  : { scale: 1 }
              }
              transition={
                isRunning
                  ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              className="flex h-52 w-52 items-center justify-center rounded-full border border-cyan-300/30 text-5xl font-semibold text-white shadow-[0_0_80px_rgba(56,189,248,0.18)]"
            >
              {formatTime(remainingSeconds)}
            </motion.div>

            <p className="mt-5 text-sm uppercase tracking-[0.25em] text-cyan-200/70">
              {mode === "Focus" ? "Focus Time" : "Break Time"}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {!isRunning ? (
                <button
                  onClick={startTimer}
                  className="rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:opacity-90"
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-violet-400/30"
                >
                  Pause
                </button>
              )}

              <button
                onClick={resetTimer}
                className="rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-violet-400/30 hover:text-white"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-white">Session Stats</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="rounded-xl bg-slate-900/60 p-4">
                Focus sessions completed: {totalFocusSessions}
              </div>
              <div className="rounded-xl bg-slate-900/60 p-4">
                Total focus minutes: {totalFocusMinutes}
              </div>
              <div className="rounded-xl bg-slate-900/60 p-4">
                Current mode: {mode}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-white">Recent Sessions</h2>

            <div className="mt-4 space-y-3">
              {sessions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-500">
                  No focus sessions yet. Start your first session.
                </div>
              ) : (
                sessions.slice(0, 5).map((session) => (
                  <div
                    key={session.id}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-white">{session.mode}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          {formatTime(session.durationSeconds)}
                        </p>
                      </div>
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
                        {session.completed ? "Completed" : "Stopped"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}