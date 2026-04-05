import AnimatedPage from "../components/ui/AnimatedPage";
import SectionHeader from "../components/ui/SectionHeader";
import NotesToolbar from "../components/notes/NotesToolbar";
import NotesList from "../components/notes/NotesList";
import NoteEditor from "../components/notes/NoteEditor";

export default function NotesPage() {
  return (
    <AnimatedPage>
      <SectionHeader
        label="Notes"
        title="Knowledge Capture"
        subtitle="Create, organize, and refine your study notes, summaries, and ideas."
      />

      <NotesToolbar />

      <div className="grid gap-4 xl:grid-cols-[0.38fr_0.62fr]">
        <NotesList />
        <NoteEditor />
      </div>
    </AnimatedPage>
  );
}