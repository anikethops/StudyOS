import SectionHeader from "../components/ui/SectionHeader";
import AnimatedPage from "../components/ui/AnimatedPage";
import { useSettingsStore } from "../store/useSettingsStore";
import { useFocusStore } from "../store/useFocusStore";

export default function SettingsPage() {
  const focusMinutes = useSettingsStore((state) => state.focusMinutes);
  const shortBreakMinutes = useSettingsStore((state) => state.shortBreakMinutes);
  const longBreakMinutes = useSettingsStore((state) => state.longBreakMinutes);
  const soundEnabled = useSettingsStore((state) => state.soundEnabled);
  const animationsEnabled = useSettingsStore((state) => state.animationsEnabled);

  const setFocusMinutes = useSettingsStore((state) => state.setFocusMinutes);
  const setShortBreakMinutes = useSettingsStore((state) => state.setShortBreakMinutes);
  const setLongBreakMinutes = useSettingsStore((state) => state.setLongBreakMinutes);
  const setSoundEnabled = useSettingsStore((state) => state.setSoundEnabled);
  const setAnimationsEnabled = useSettingsStore((state) => state.setAnimationsEnabled);

  const resetTimer = useFocusStore((state) => state.resetTimer);

  const handleDurationChange = (
    setter: (value: number) => void,
    value: string
  ) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return;
    setter(parsed);
    resetTimer();
  };

  return (
    <AnimatedPage>
      <SectionHeader
        label="Settings"
        title="Preferences"
        subtitle="Adjust timer behavior, sound, and animation settings for your ideal workflow."
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-white">Timer Durations</h2>

          <div className="mt-5 grid gap-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Focus Minutes</label>
              <input
                type="number"
                min={1}
                value={focusMinutes}
                onChange={(e) => handleDurationChange(setFocusMinutes, e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Short Break Minutes</label>
              <input
                type="number"
                min={1}
                value={shortBreakMinutes}
                onChange={(e) => handleDurationChange(setShortBreakMinutes, e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Long Break Minutes</label>
              <input
                type="number"
                min={1}
                value={longBreakMinutes}
                onChange={(e) => handleDurationChange(setLongBreakMinutes, e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-white">Experience</h2>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <div>
                <p className="text-sm font-medium text-white">Sound Effects</p>
                <p className="mt-1 text-xs text-slate-400">
                  Play a sound when a timer completes
                </p>
              </div>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  soundEnabled
                    ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30"
                    : "bg-slate-800 text-slate-300 border border-white/10"
                }`}
              >
                {soundEnabled ? "On" : "Off"}
              </button>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <div>
                <p className="text-sm font-medium text-white">Animations</p>
                <p className="mt-1 text-xs text-slate-400">
                  Enable smooth motion and transitions
                </p>
              </div>

              <button
                onClick={() => setAnimationsEnabled(!animationsEnabled)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  animationsEnabled
                    ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/30"
                    : "bg-slate-800 text-slate-300 border border-white/10"
                }`}
              >
                {animationsEnabled ? "On" : "Off"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}