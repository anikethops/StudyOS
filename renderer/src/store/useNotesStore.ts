import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Note } from "../types/note";

type NotesStore = {
  notes: Note[];
  searchQuery: string;
  activeNoteId: string | null;
  setSearchQuery: (query: string) => void;
  setActiveNoteId: (id: string | null) => void;
  addNote: () => void;
  updateNote: (id: string, updates: Partial<Pick<Note, "title" | "content" | "tags">>) => void;
  deleteNote: (id: string) => void;
  togglePinned: (id: string) => void;
};

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],
      searchQuery: "",
      activeNoteId: null,

      setSearchQuery: (query) => set({ searchQuery: query }),
      setActiveNoteId: (id) => set({ activeNoteId: id }),

      addNote: () => {
        const newNote: Note = {
          id: crypto.randomUUID(),
          title: "",
          content: "",
          tags: [],
          pinned: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          notes: [newNote, ...state.notes],
          activeNoteId: newNote.id,
        }));
      },

      updateNote: (id, updates) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : note
          ),
        })),

      deleteNote: (id) =>
        set((state) => {
          const filtered = state.notes.filter((note) => note.id !== id);
          const nextActive =
            state.activeNoteId === id ? filtered[0]?.id ?? null : state.activeNoteId;

          return {
            notes: filtered,
            activeNoteId: nextActive,
          };
        }),

      togglePinned: (id) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, pinned: !note.pinned } : note
          ),
        })),
    }),
    {
      name: "studyos-notes",
    }
  )
);