import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, TaskCategory, TaskPriority } from "../types/task";
import { useProgressStore } from "./useProgressStore";

type TaskFilter = "All" | "Todo" | "Done";
type TaskSort = "Newest" | "Oldest" | "Priority";

type TaskStore = {
  tasks: Task[];
  filter: TaskFilter;
  sortBy: TaskSort;
  setFilter: (filter: TaskFilter) => void;
  setSortBy: (sortBy: TaskSort) => void;
  addTask: (task: {
    title: string;
    description?: string;
    category: TaskCategory;
    priority: TaskPriority;
    dueDate?: string;
  }) => void;
  updateTask: (
    id: string,
    updates: {
      title: string;
      description?: string;
      category: TaskCategory;
      priority: TaskPriority;
      dueDate?: string;
    }
  ) => void;
  toggleTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      filter: "All",
      sortBy: "Newest",

      setFilter: (filter) => set({ filter }),
      setSortBy: (sortBy) => set({ sortBy }),

      addTask: (task) =>
        set((state) => ({
          tasks: [
            {
              id: crypto.randomUUID(),
              title: task.title,
              description: task.description,
              category: task.category,
              priority: task.priority,
              dueDate: task.dueDate,
              status: "Todo",
              createdAt: new Date().toISOString(),
            },
            ...state.tasks,
          ],
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  title: updates.title,
                  description: updates.description,
                  category: updates.category,
                  priority: updates.priority,
                  dueDate: updates.dueDate,
                }
              : task
          ),
        })),

      toggleTaskStatus: (id) =>
        set((state) => {
          const targetTask = state.tasks.find((task) => task.id === id);

          if (targetTask && targetTask.status === "Todo") {
            useProgressStore.getState().recordTaskCompleted();
          }

          return {
            tasks: state.tasks.map((task) =>
              task.id === id
                ? {
                    ...task,
                    status: task.status === "Todo" ? "Done" : "Todo",
                  }
                : task
            ),
          };
        }),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    {
      name: "studyos-tasks",
    }
  )
);