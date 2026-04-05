import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DailyProgress, ProgressState } from "../types/progress";

type ProgressStore = ProgressState & {
  ensureTodayEntry: () => void;
  recordFocusSession: (minutes: number) => void;
  recordTaskCompleted: () => void;
  getTodayProgress: () => DailyProgress;
  recalculateStreak: () => void;
};

function getTodayDateString() {
  return new Date().toISOString().split("T")[0];
}

function getYesterdayDateString(fromDate?: string) {
  const base = fromDate ? new Date(fromDate) : new Date();
  const d = new Date(base);
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

function createEmptyDay(date: string): DailyProgress {
  return {
    date,
    focusMinutes: 0,
    focusSessionsCompleted: 0,
    tasksCompleted: 0,
  };
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      daily: [],
      streakCount: 0,
      lastActiveDate: undefined,

      ensureTodayEntry: () => {
        const today = getTodayDateString();
        const { daily } = get();

        const exists = daily.some((entry) => entry.date === today);
        if (exists) return;

        set({
          daily: [createEmptyDay(today), ...daily].sort((a, b) =>
            a.date < b.date ? 1 : -1
          ),
        });
      },

      recordFocusSession: (minutes) => {
        const today = getTodayDateString();
        get().ensureTodayEntry();

        const updatedDaily = get().daily.map((entry) =>
          entry.date === today
            ? {
                ...entry,
                focusMinutes: entry.focusMinutes + minutes,
                focusSessionsCompleted: entry.focusSessionsCompleted + 1,
              }
            : entry
        );

        set({
          daily: updatedDaily,
          lastActiveDate: today,
        });

        get().recalculateStreak();
      },

      recordTaskCompleted: () => {
        const today = getTodayDateString();
        get().ensureTodayEntry();

        const updatedDaily = get().daily.map((entry) =>
          entry.date === today
            ? {
                ...entry,
                tasksCompleted: entry.tasksCompleted + 1,
              }
            : entry
        );

        set({
          daily: updatedDaily,
          lastActiveDate: today,
        });

        get().recalculateStreak();
      },

      getTodayProgress: () => {
        const today = getTodayDateString();
        const entry = get().daily.find((item) => item.date === today);
        return entry ?? createEmptyDay(today);
      },

      recalculateStreak: () => {
        const { daily } = get();

        const activeDays = [...daily]
          .filter(
            (entry) =>
              entry.focusMinutes > 0 ||
              entry.focusSessionsCompleted > 0 ||
              entry.tasksCompleted > 0
          )
          .sort((a, b) => (a.date < b.date ? 1 : -1));

        if (activeDays.length === 0) {
          set({ streakCount: 0 });
          return;
        }

        const today = getTodayDateString();
        const yesterday = getYesterdayDateString();

        if (activeDays[0].date !== today && activeDays[0].date !== yesterday) {
          set({ streakCount: 0 });
          return;
        }

        let streak = 1;

        for (let i = 0; i < activeDays.length - 1; i++) {
          const current = new Date(activeDays[i].date);
          const next = new Date(activeDays[i + 1].date);

          const diffMs = current.getTime() - next.getTime();
          const diffDays = diffMs / (1000 * 60 * 60 * 24);

          if (diffDays === 1) {
            streak++;
          } else {
            break;
          }
        }

        set({ streakCount: streak });
      },
    }),
    {
      name: "studyos-progress",
    }
  )
);