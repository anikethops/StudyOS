import { useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";
import type { TaskCategory, TaskPriority } from "../../types/task";

const categories: TaskCategory[] = [
  "Study",
  "Assignment",
  "Revision",
  "Personal",
  "Habit",
];

const priorities: TaskPriority[] = ["Low", "Medium", "High"];

export default function AddTaskForm() {
  const addTask = useTaskStore((state) => state.addTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TaskCategory>("Study");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      priority,
      dueDate: dueDate || undefined,
    });

    setTitle("");
    setDescription("");
    setCategory("Study");
    setPriority("Medium");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl"
    >
      <h2 className="text-xl font-semibold text-white">Add Task</h2>

      <div className="mt-5 grid gap-4">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Revise chapter 3"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-violet-400/40"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional details..."
            rows={3}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-violet-400/40"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
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
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
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
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:opacity-90"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}