import { useGameStore } from "@/stores/game-store";
import { RotateCcw } from "lucide-react";
import { useMemo } from "react";
import { Button } from "../ui/button";
import { SettingsDialog } from "./settings-dialog";

export default function ActionBar() {
  const undo = useGameStore((e) => e.undo);
  const engine = useGameStore((e) => e.engine);
  const board = useGameStore((e) => e.boardState);
  const restart = useGameStore((e) => e.restart);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const disabled = useMemo(() => engine.history.length === 0, [board, engine]);
  return (
    <div className="max-w-screen-sm w-full flex justify-between py-6 px-4">
      <div className="flex gap-2 items-center">
        <SettingsDialog />
        <Button variant="secondary" onClick={() => restart()}>
          <RotateCcw />
          재시작
        </Button>
      </div>
      <Button variant={"secondary"} onClick={() => undo()} disabled={disabled}>
        동작 취소
      </Button>
    </div>
  );
}
