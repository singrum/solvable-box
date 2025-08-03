import { useGameStore } from "@/stores/game-store";
import React, { useRef } from "react";
import AppleBox from "./apple-box";
import { appleWidth } from "./constants";
import Indicator from "./Indicator";

export default function GameBoard() {
  const setStartPos = useGameStore((e) => e.setStartPos);
  const setEndPos = useGameStore((e) => e.setEndPos);
  const dragging = useRef(false);
  const boardRef = useRef<HTMLDivElement>(null);

  const getRelativeToCenter = (e: React.PointerEvent) => {
    if (!boardRef.current) return [0, 0] as [number, number];
    const rect = boardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return [
      (e.clientX - centerX) / appleWidth,
      (e.clientY - centerY) / appleWidth,
    ] as [number, number];
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    setStartPos(getRelativeToCenter(e));
    setEndPos(undefined);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    setEndPos(getRelativeToCenter(e));
  };

  return (
    <div className="relative">
      <div
        ref={boardRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (dragging.current = false)}
        onPointerLeave={() => (dragging.current = false)}
        className="select-none border touch-none flex flex-col justify-center items-center aspect-square"
      >
        <AppleBox />
        <Indicator />
      </div>
    </div>
  );
}
