import { useEffect } from "react";
import { useFocusStore } from "../store/useFocusStore";

export default function useFocusTimer() {
  const isRunning = useFocusStore((state) => state.isRunning);
  const tick = useFocusStore((state) => state.tick);

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      tick();
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning, tick]);
}