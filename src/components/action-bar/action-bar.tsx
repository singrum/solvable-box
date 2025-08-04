import { useGameStore } from "@/stores/game-store";
import { useMemo } from "react";
import { Button } from "../ui/button";
import SeedInput from "./seed-input";
import { SettingsDialog } from "./settings-dialog";

export default function ActionBar() {
  const undo = useGameStore((e) => e.undo);
  const engine = useGameStore((e) => e.engine);
  const board = useGameStore((e) => e.boardState);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const disabled = useMemo(() => engine.history.length === 0, [board, engine]);
  const gameState = useGameStore((e) => e.gameState);
  return (
    <div className="max-w-screen-sm w-full flex justify-between py-6 px-4 gap-2 pt-0">
      <div className="flex gap-2 items-center flex-1 ">
        <SettingsDialog />
        <SeedInput />
      </div>
      <Button
        variant={"secondary"}
        onClick={() => undo()}
        disabled={disabled || gameState === "end"}
      >
        동작 취소
      </Button>
    </div>
  );
}
