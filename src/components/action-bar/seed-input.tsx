import { useGameStore } from "@/stores/game-store";
import { Shuffle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // ✅ 추가
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function SeedInput() {
  const restart = useGameStore((e) => e.restart);
  const seed = useGameStore((e) => e.seed);
  const setSeed = useGameStore((e) => e.setSeed);
  const [value, setValue] = useState<string>("");

  const navigate = useNavigate(); // ✅ 추가
  const [searchParams] = useSearchParams(); // ✅ 추가

  useEffect(() => {
    setValue(seed);
  }, [seed]);

  const updateQueryParam = (key: string, val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, val);
    navigate(`?${params.toString()}`, { replace: true });
  };

  return (
    <div className="relative flex-1 w-auto max-w-[200px]">
      <Input
        id="seed"
        className="pl-12"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSeed(value);
            updateQueryParam("seed", value); // ✅ 쿼리 파라미터 업데이트
          }
        }}
      />

      <Label
        htmlFor="seed"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-xs"
      >
        시드 :
      </Label>

      <Button
        variant="ghost"
        onClick={() => {
          restart(); // 시드도 내부에서 랜덤하게 바뀜
          updateQueryParam("seed", useGameStore.getState().seed); // ✅ 최신 시드로 쿼리 갱신
        }}
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2"
      >
        <Shuffle />
      </Button>
    </div>
  );
}
