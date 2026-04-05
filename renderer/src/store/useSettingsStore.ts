import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppSettings } from "../types/settings";

type SettingsStore = AppSettings & {
  setFocusMinutes: (value: number) => void;
  setShortBreakMinutes: (value: number) => void;
  setLongBreakMinutes: (value: number) => void;
  setSoundEnabled: (value: boolean) => void;
  setAnimationsEnabled: (value: boolean) => void;
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      focusMinutes: 25,
      shortBreakMinutes: 5,
      longBreakMinutes: 15,
      soundEnabled: true,
      animationsEnabled: true,

      setFocusMinutes: (value) => set({ focusMinutes: value }),
      setShortBreakMinutes: (value) => set({ shortBreakMinutes: value }),
      setLongBreakMinutes: (value) => set({ longBreakMinutes: value }),
      setSoundEnabled: (value) => set({ soundEnabled: value }),
      setAnimationsEnabled: (value) => set({ animationsEnabled: value }),
    }),
    {
      name: "studyos-settings",
    }
  )
);