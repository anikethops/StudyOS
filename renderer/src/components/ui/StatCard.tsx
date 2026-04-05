import clsx from "clsx";
import { motion } from "framer-motion";

type Props = {
  title: string;
  value: string;
  hint?: string;
  variant?: "default" | "violet" | "cyan";
};

export default function StatCard({
  title,
  value,
  hint,
  variant = "default",
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.015 }}
      className={clsx(
        "rounded-2xl border p-5 shadow-xl backdrop-blur transition-all duration-300",
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
    </motion.div>
  );
}