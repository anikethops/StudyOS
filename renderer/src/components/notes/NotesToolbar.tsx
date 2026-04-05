import { useNotesStore } from "../../store/useNotesStore";

export default function NotesToolbar() {
  const searchQuery = useNotesStore((state) => state.searchQuery);
  const setSearchQuery = useNotesStore((state) => state.setSearchQuery);
  const addNote = useNotesStore((state) => state.addNote);

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search notes..."
        className="w-full md:max-w-md rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-violet-400/40"
      />

      <button
        onClick={addNote}
        className="rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:opacity-90"
      >
        New Note
      </button>
    </div>
  );
}