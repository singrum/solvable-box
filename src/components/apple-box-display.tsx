import { cn } from "@/lib/utils";
import Apple from "./game-board/apple";

export default function AppleBoxDisplay({
  board,
  className,
}: {
  board: number[][];
  className?: string;
}) {
  return (
    <div
      className={cn("grid w-full h-full max-w-120", className)}
      style={{
        gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
      }}
    >
      {board.map((arr) =>
        arr.map((num, col) => {
          return (
            <Apple
              key={col}
              className={cn({
                "opacity-0": num === 0,
              })}
            >
              {num}
            </Apple>
          );
        })
      )}
    </div>
  );
}
