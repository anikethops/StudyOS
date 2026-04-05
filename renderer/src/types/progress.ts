export type DailyProgress = {
  date: string; // YYYY-MM-DD
  focusMinutes: number;
  focusSessionsCompleted: number;
  tasksCompleted: number;
};

export type ProgressState = {
  daily: DailyProgress[];
  streakCount: number;
  lastActiveDate?: string;
};