import { getZeros } from "@/lib/game/algorithms";
import { useGameStore } from "@/stores/game-store";
import { useEffect, useState } from "react";
import AppleBoxDisplay from "../apple-box-display";

export default function AppleBox({ className }: { className?: string }) {
  const engine = useGameStore((e) => e.engine);
  const [currentIndex, setCurrentIndex] = useState(0);
  const history = [...engine.history, getZeros(engine.width, engine.height)];
  useEffect(() => {
    if (!history.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        return (prev + 1) % history.length;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [history.length]);

  return (
    <AppleBoxDisplay className={className} board={history[currentIndex]} />
  );
}
