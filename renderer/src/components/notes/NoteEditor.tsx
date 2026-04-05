import { useMemo } from "react";
import { useNotesStore } from "../../store/useNotesStore";
import TagsInput from "./TagsInput";

export default function NoteEditor() {
  const notes = useNotesStore((state) => state.notes);
  const activeNoteId = useNotesStore((state) => state.activeNoteId);
  const updateNote = useNotesStore((state) => state.updateNote);

  const activeNote = useMemo(
    () => notes.find((note) => note.id === activeNoteId) ?? null,
    [notes, activeNoteId]
  );

  if (!activeNote) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl">
        <p className="text-sm font-medium text-white">Editor</p>
        <div className="mt-4 min-h-[360px] rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-500">
          Select a note or create a new one.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl">
      <p className="text-sm font-medium text-white">Editor</p>

      <div className="mt-4 space-y-4">
        <input
          value={activeNote.title}
          onChange={(e) =>
            updateNote(activeNote.id, {
              title: e.target.value,
            })
          }
          placeholder="Note title"
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-violet-400/40"
        />

        <textarea
          value={activeNote.content}
          onChange={(e) =>
            updateNote(activeNote.id, {
              content: e.target.value,
            })
          }
          placeholder="Write your note here..."
          rows={14}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-violet-400/40"
        />

        <div>
          <label className="mb-2 block text-sm text-slate-300">Tags</label>
          <TagsInput
            tags={activeNote.tags}
            onChange={(tags) =>
              updateNote(activeNote.id, {
                tags,
              })
            }
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-xs text-slate-400">
          Auto-saved • Updated: {new Date(activeNote.updatedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}