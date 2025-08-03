import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/game-store";
import Apple from "./apple";

export default function AppleBox() {
  const board = useGameStore((e) => e.boardState);

  return (
    <div className="flex flex-col">
      {board.map((arr, row) => (
        <div className="flex" key={row}>
          {arr.map((num, col) => (
            <Apple key={col} className={cn({ "opacity-0": num === 0 })}>
              {num}
            </Apple>
          ))}
        </div>
      ))}
    </div>
  );
}
