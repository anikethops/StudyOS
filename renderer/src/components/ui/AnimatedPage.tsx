import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSettingsStore } from "../../store/useSettingsStore";

type Props = {
  children: ReactNode;
};

export default function AnimatedPage({ children }: Props) {
  const animationsEnabled = useSettingsStore((state) => state.animationsEnabled);

  if (!animationsEnabled) {
    return <div className="space-y-8">{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-8"
    >
      {children}
    </motion.div>
  );
}