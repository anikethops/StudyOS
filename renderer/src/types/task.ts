export type TaskCategory =
  | "Study"
  | "Assignment"
  | "Revision"
  | "Personal"
  | "Habit";

export type TaskPriority = "Low" | "Medium" | "High";

export type TaskStatus = "Todo" | "Done";

export type Task = {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  createdAt: string;
};