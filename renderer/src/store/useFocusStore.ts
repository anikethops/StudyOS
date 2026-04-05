import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FocusMode, FocusSession } from "../types/focus";
import { useProgressStore } from "./useProgressStore";
import { useSettingsStore } from "./useSettingsStore";
import ding from "../assets/ding.mp3";

type FocusStore = {
  mode: FocusMode;
  isRunning: boolean;
  remainingSeconds: number;
  sessions: FocusSession[];
  setMode: (mode: FocusMode) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  tick: () => void;
  resetTimer: () => void;
  completeSession: () => void;
};

export function getModeDurations() {
  const settings = useSettingsStore.getState();

  return {
    Focus: settings.focusMinutes * 60,
    "Short Break": settings.shortBreakMinutes * 60,
    "Long Break": settings.longBreakMinutes * 60,
  } as const;
}

export const useFocusStore = create<FocusStore>()(
  persist(
    (set, get) => ({
      mode: "Focus",
      isRunning: false,
      remainingSeconds: 25 * 60,
      sessions: [],

      setMode: (mode) => {
        const durations = getModeDurations();

        set({
          mode,
          isRunning: false,
          remainingSeconds: durations[mode],
        });
      },

      startTimer: () => set({ isRunning: true }),

      pauseTimer: () => set({ isRunning: false }),

      tick: () => {
        const { remainingSeconds, completeSession } = get();

        if (remainingSeconds <= 1) {
          completeSession();
          return;
        }

        set({ remainingSeconds: remainingSeconds - 1 });
      },

      resetTimer: () => {
        const { mode } = get();
        const durations = getModeDurations();

        set({
          isRunning: false,
          remainingSeconds: durations[mode],
        });
      },

      completeSession: () => {
        const { mode, remainingSeconds, sessions } = get();
        const durations = getModeDurations();
        const fullDuration = durations[mode];

        const completed = remainingSeconds <= 1;
        const actualDurationSeconds = fullDuration - remainingSeconds;

        const newSession: FocusSession = {
          id: crypto.randomUUID(),
          mode,
          startedAt: new Date(
            Date.now() - actualDurationSeconds * 1000
          ).toISOString(),
          endedAt: new Date().toISOString(),
          durationSeconds: actualDurationSeconds,
          completed,
        };

        const { soundEnabled } = useSettingsStore.getState();
        if (soundEnabled) {
          const audio = new Audio(ding);
          audio.volume = 0.5;
          audio.play().catch(() => {});
        }

        if (mode === "Focus" && actualDurationSeconds > 0) {
          useProgressStore
            .getState()
            .recordFocusSession(Math.max(1, Math.floor(actualDurationSeconds / 60)));
        }

        let nextMode: FocusMode = "Focus";
        if (mode === "Focus") {
          nextMode = "Short Break";
        } else {
          nextMode = "Focus";
        }

        set({
          mode: nextMode,
          isRunning: false,
          remainingSeconds: durations[nextMode],
          sessions: [newSession, ...sessions],
        });
      },
    }),
    {
      name: "studyos-focus",
    }
  )
);