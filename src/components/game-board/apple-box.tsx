import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/game-store";
import { sum } from "lodash";
import Apple from "./apple";

export default function AppleBox() {
  const board = useGameStore((e) => e.boardState);
  const startPos = useGameStore((e) => e.startPos);
  const dragPos = useGameStore((e) => e.currentPos);
  const engine = useGameStore((e) => e.engine);
  const selectedItems =
    (startPos && dragPos && engine.getInsideItems(startPos, dragPos)) || [];
  const satisfied =
    sum(selectedItems.map(([i, j]) => engine.board[i][j])) === 10;
  return (
    <div
      className="grid w-full h-full max-w-120"
      style={{
        gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
      }}
    >
      {board.map((arr, row) =>
        arr.map((num, col) => {
          const selected = selectedItems.some(
            (e) => e[0] === row && e[1] === col
          );

          return (
            <Apple
              key={col}
              className={cn({
                "opacity-0": num === 0,
              })}
              status={
                selected ? (satisfied ? "satisfied" : "selected") : "unselected"
              }
            >
              {num}
            </Apple>
          );
        })
      )}
    </div>
  );
}
