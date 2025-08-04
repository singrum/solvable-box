import { useGameStore } from "@/stores/game-store";
import { Shuffle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function SeedInput() {
  const restart = useGameStore((e) => e.restart);
  const seed = useGameStore((e) => e.seed);
  const setSeed = useGameStore((e) => e.setSeed);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(seed);
  }, [seed]);
  return (
    <div className="relative flex-1 w-auto max-w-[200px]">
      <Input
        id="seed"
        className="pl-12 "
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            // console.log(value);
            setSeed(value);
          }
        }}
      />

      <Label
        htmlFor="seed"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-xs "
      >
        시드 :
      </Label>

      <Button
        variant="ghost"
        onClick={() => restart()}
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2"
      >
        <Shuffle />
      </Button>
    </div>
  );
}
