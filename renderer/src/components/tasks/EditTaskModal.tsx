import { useEffect, useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";
import type { Task, TaskCategory, TaskPriority } from "../../types/task";
import { motion } from "framer-motion";

const categories: TaskCategory[] = [
  "Study",
  "Assignment",
  "Revision",
  "Personal",
  "Habit",
];

const priorities: TaskPriority[] = ["Low", "Medium", "High"];

type Props = {
  task: Task | null;
  onClose: () => void;
};

export default function EditTaskModal({ task, onClose }: Props) {
  const updateTask = useTaskStore((state) => state.updateTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TaskCategory>("Study");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setCategory(task.category);
      setPriority(task.priority);
      setDueDate(task.dueDate || "");
    }
  }, [task]);

  if (!task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    updateTask(task.id, {
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      priority,
      dueDate: dueDate || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <motion.form
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Edit Task</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="mt-5 grid gap-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
              >
                {categories.map((item) => (
                  <option key={item} value={item} className="bg-slate-900 text-white">
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
              >
                {priorities.map((item) => (
                  <option key={item} value={item} className="bg-slate-900 text-white">
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </motion.form>
    </div>
  );
}