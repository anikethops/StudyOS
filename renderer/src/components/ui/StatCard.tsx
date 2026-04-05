import clsx from "clsx";

type Props = {
  title: string;
  value: string;
  hint?: string;
  variant?: "default" | "violet" | "cyan";
};

export default function StatCard({ title, value, hint, variant = "default" }: Props) {
  return (
    <div
      className={clsx(
        "rounded-2xl p-5 shadow-xl backdrop-blur border transition-all duration-300 hover:scale-[1.02]",
        variant === "default" && "border-white/10 bg-white/5",
        variant === "violet" &&
          "border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-transparent",
        variant === "cyan" &&
          "border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-transparent"
      )}
    >
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>

      {hint && <p className="mt-2 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}