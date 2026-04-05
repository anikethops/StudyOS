import { useState } from "react";
import AnimatedPage from "../components/ui/AnimatedPage";
import SectionHeader from "../components/ui/SectionHeader";
import { useNotesStore } from "../store/useNotesStore";

type ToolMode = "summary" | "bullets" | "questions";

export default function AIStudioPage() {
  const [mode, setMode] = useState<ToolMode>("summary");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addNote = useNotesStore((state) => state.addNote);
  const updateNote = useNotesStore((state) => state.updateNote);

  const runTool = async () => {
    if (!text.trim()) {
      setError("Please paste some notes first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await window.studyOS.runStudyTool({
        mode,
        text,
      });

      if (!response.ok) {
        setError(response.error || "Something went wrong.");
      } else {
        setResult(response.data || "");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToNotes = () => {
    if (!result.trim()) return;

    addNote();

    const notes = useNotesStore.getState().notes;
    const newNote = notes[0];

    if (!newNote) return;

    updateNote(newNote.id, {
      title: "AI Generated Notes",
      content: result,
      tags: ["ai", mode],
    });
  };

  const handleClearInput = () => {
    setText("");
    setResult("");
    setError("");
  };

  return (
    <AnimatedPage>
      <SectionHeader
        label="AI Studio"
        title="Study Intelligence"
        subtitle="Summarize notes, convert them into bullet points, or generate revision questions."
      />

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-white">Input</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {[
              { key: "summary", label: "Summarize" },
              { key: "bullets", label: "Bullet Points" },
              { key: "questions", label: "Questions" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setMode(item.key as ToolMode)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  mode === item.key
                    ? "border-violet-400/40 bg-violet-500/20 text-white"
                    : "border-white/10 text-slate-300 hover:border-violet-400/30 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your study notes here..."
            rows={16}
            maxLength={3000}
            className="mt-5 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-violet-400/40"
          />

          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-xs text-slate-500">{text.length}/3000 characters</p>

            <button
              onClick={handleClearInput}
              type="button"
              className="text-xs text-slate-400 transition hover:text-white"
            >
              Clear Input
            </button>
          </div>

          <button
            onClick={runTool}
            disabled={loading}
            className="mt-5 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Run AI Tool"}
          </button>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-white">Output</h2>

          <div className="mt-5 min-h-[360px] rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm whitespace-pre-wrap text-slate-200">
            {loading
              ? "AI is generating response..."
              : result || "Your AI output will appear here."}
          </div>

          {result && (
            <button
              onClick={handleSaveToNotes}
              className="mt-4 rounded-xl bg-cyan-500/20 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-500/30"
            >
              Save to Notes
            </button>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}