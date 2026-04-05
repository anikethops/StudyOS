import { useState } from "react";

type Props = {
  tags: string[];
  onChange: (tags: string[]) => void;
};

export default function TagsInput({ tags, onChange }: Props) {
  const [input, setInput] = useState("");

  const addTag = (rawValue: string) => {
    const cleaned = rawValue.trim().replace(/,$/, "");
    if (!cleaned) return;

    const alreadyExists = tags.some(
      (tag) => tag.toLowerCase() === cleaned.toLowerCase()
    );
    if (alreadyExists) {
      setInput("");
      return;
    }

    onChange([...tags, cleaned]);
    setInput("");
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200"
          >
            #{tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="rounded-full text-cyan-100/80 transition hover:text-white"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "," || e.key === "Enter") {
            e.preventDefault();
            addTag(input);
          }

          if (e.key === "Backspace" && !input && tags.length > 0) {
            removeTag(tags[tags.length - 1]);
          }
        }}
        onBlur={() => {
          if (input.trim()) addTag(input);
        }}
        placeholder="Type a tag and press comma or Enter"
        className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-violet-400/40"
      />
    </div>
  );
}