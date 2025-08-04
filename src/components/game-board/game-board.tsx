import { useGameStore } from "@/stores/game-store";
import React, { useRef } from "react";
import AppleBox from "./apple-box";

import Indicator from "./Indicator";

export default function GameBoard() {
  const setStartPos = useGameStore((e) => e.setStartPos);
  const setEndPos = useGameStore((e) => e.setEndPos);
  const setCurrentPos = useGameStore((e) => e.setCurrentPos); // 추가
  const dragging = useRef(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const appleSize = useGameStore((e) => e.appleSize);
  const getRelativeToCenter = (e: React.PointerEvent) => {
    if (!boardRef.current) return [0, 0] as [number, number];
    const rect = boardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return [
      appleSize ? (e.clientX - centerX) / appleSize : 0,
      appleSize ? (e.clientY - centerY) / appleSize : 0,
    ] as [number, number];
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    const pos = getRelativeToCenter(e);
    setStartPos(pos);
    setCurrentPos(pos); // 초기값 설정
    setEndPos(undefined);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setCurrentPos(getRelativeToCenter(e)); // 현재 위치 저장
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    setEndPos(getRelativeToCenter(e));
    setCurrentPos(undefined); // 드래그 종료 후 currentPos 초기화
  };

  return (
    <div
      ref={boardRef}
      className="relative bg-background rounded-xl w-full h-full flex items-center justify-center "
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (dragging.current = false)}
        onPointerLeave={() => (dragging.current = false)}
        className="select-none touch-none flex flex-col justify-center items-center max-w-screen-sm w-full p-2 py-12"
        style={{}}
      >
        <AppleBox />
        <Indicator />
      </div>
    </div>
  );
}
