import React, { useRef, useState } from "react";

export default function GameCanvas() {
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [endPos, setEndPos] = useState<{ x: number; y: number } | null>(null);
  const dragging = useRef(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    setStartPos({ x: e.clientX, y: e.clientY });
    setEndPos(null);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    setEndPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
      className="select-none border touch-none flex flex-col justify-center items-center aspect-square"
    >
      <div>
        {startPos
          ? `Pressed at: (${startPos.x}, ${startPos.y})`
          : "Press down to start"}
      </div>
      <div className="mt-2">
        {endPos
          ? `Released at: (${endPos.x}, ${endPos.y})`
          : "Release to get end position"}
      </div>
    </div>
  );
}
