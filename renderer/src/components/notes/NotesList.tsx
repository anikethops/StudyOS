import clsx from "clsx";
import { useMemo } from "react";
import { useNotesStore } from "../../store/useNotesStore";

export default function NotesList() {
  const notes = useNotesStore((state) => state.notes);
  const searchQuery = useNotesStore((state) => state.searchQuery);
  const activeNoteId = useNotesStore((state) => state.activeNoteId);
  const setActiveNoteId = useNotesStore((state) => state.setActiveNoteId);
  const togglePinned = useNotesStore((state) => state.togglePinned);
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const filteredNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const result = notes.filter((note) => {
      if (!q) return true;

      return (
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q) ||
        note.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });

    return [...result].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [notes, searchQuery]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl">
      <p className="text-sm font-medium text-white">Notes List</p>

      <div className="mt-4 space-y-3">
        {filteredNotes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-500">
            No notes found. Create a new note to begin.
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={clsx(
                "cursor-pointer rounded-2xl border p-4 transition",
                activeNoteId === note.id
                  ? "border-violet-400/30 bg-violet-500/10"
                  : "border-white/10 bg-slate-900/60 hover:border-violet-400/20"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {note.pinned ? "📌 " : ""}
                    {note.title || "Untitled Note"}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs text-slate-400">
                    {note.content || "No content yet."}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePinned(note.id);
                    }}
                    className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-300 hover:text-white"
                  >
                    {note.pinned ? "Unpin" : "Pin"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    className="rounded-lg border border-red-400/20 bg-red-500/10 px-2 py-1 text-xs text-red-200 hover:bg-red-500/20"
                  >
                    Del
                  </button>
                </div>
              </div>

              {note.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {note.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-[11px] text-cyan-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}