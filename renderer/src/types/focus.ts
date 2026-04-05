export type FocusMode = "Focus" | "Short Break" | "Long Break";

export type FocusSession = {
  id: string;
  mode: FocusMode;
  startedAt: string;
  endedAt?: string;
  durationSeconds: number;
  completed: boolean;
};