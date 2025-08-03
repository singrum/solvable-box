import { useRef, useState } from "react";

export default function Indicator() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [end, setEnd] = useState<{ x: number; y: number } | null>(null);

  const getRelativePos = (e: React.MouseEvent | React.TouchEvent) => {
    const { left, top } = containerRef.current!.getBoundingClientRect();
    const point = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
    return {
      x: point.clientX - left,
      y: point.clientY - top,
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getRelativePos(e);
    setStart(pos);
    setEnd(pos);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!start) return;
    const pos = getRelativePos(e);
    setEnd(pos);
  };

  const handleEnd = () => {
    setStart(null);
    setEnd(null);
  };

  const rect =
    start && end
      ? {
          left: Math.min(start.x, end.x),
          top: Math.min(start.y, end.y),
          width: Math.abs(end.x - start.x),
          height: Math.abs(end.y - start.y),
        }
      : null;

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full"
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      {rect && (
        <div
          className="absolute border border-primary bg-primary/20 pointer-events-none"
          style={{
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
          }}
        />
      )}
    </div>
  );
}
