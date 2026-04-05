import { useMemo, useState } from "react";
import clsx from "clsx";
import { useTaskStore } from "../../store/useTaskStore";
import EditTaskModal from "./EditTaskModal";
import type { Task } from "../../types/task";
import { motion } from "framer-motion";

export default function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);
  const sortBy = useTaskStore((state) => state.sortBy);
  const setFilter = useTaskStore((state) => state.setFilter);
  const setSortBy = useTaskStore((state) => state.setSortBy);
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    const result = tasks.filter((task) => {
      if (filter === "All") return true;
      return task.status === filter;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "Newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      if (sortBy === "Oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      const priorityRank = { High: 3, Medium: 2, Low: 1 };
      return priorityRank[b.priority] - priorityRank[a.priority];
    });
  }, [tasks, filter, sortBy]);

  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <h2 className="text-xl font-semibold text-white">Your Tasks</h2>

          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2">
              {(["All", "Todo", "Done"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={clsx(
                    "rounded-full border px-4 py-2 text-sm transition",
                    filter === item
                      ? "border-violet-400/40 bg-violet-500/20 text-white"
                      : "border-white/10 text-slate-300 hover:border-violet-400/30 hover:text-white"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "Newest" | "Oldest" | "Priority")
              }
              className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-white outline-none focus:border-violet-400/40"
            >
              <option value="Newest">Sort: Newest</option>
              <option value="Oldest">Sort: Oldest</option>
              <option value="Priority">Sort: Priority</option>
            </select>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-slate-500">
              No tasks yet. Add your first task to begin.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                whileHover={{ y: -2 }}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={clsx(
                          "flex h-6 w-6 items-center justify-center rounded-md border text-xs transition",
                          task.status === "Done"
                            ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-300"
                            : "border-white/15 text-slate-400 hover:border-violet-400/40 hover:text-white"
                        )}
                      >
                        {task.status === "Done" ? "✓" : ""}
                      </button>

                      <h3
                        className={clsx(
                          "text-base font-medium",
                          task.status === "Done"
                            ? "text-slate-500 line-through"
                            : "text-white"
                        )}
                      >
                        {task.title}
                      </h3>
                    </div>

                    {task.description && (
                      <p className="mt-2 text-sm text-slate-400">{task.description}</p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-cyan-200">
                        {task.category}
                      </span>
                      <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-violet-200">
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
                          Due: {task.dueDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-violet-400/30 hover:text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm text-red-200 transition hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <EditTaskModal task={editingTask} onClose={() => setEditingTask(null)} />
    </>
  );
}