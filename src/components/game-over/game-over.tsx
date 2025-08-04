import { useGameStore } from "@/stores/game-store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import AppleBox from "./apple-box";

export default function GameOver() {
  const restart = useGameStore((e) => e.restart);

  const navigate = useNavigate(); // ✅ 추가
  const [searchParams] = useSearchParams(); // ✅ 추가

  const updateQueryParam = (key: string, val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, val);
    navigate(`?${params.toString()}`, { replace: true });
  };

  return (
    <>
      <div className="relative bg-background rounded-xl w-full h-full flex items-center justify-center flex-col">
        <div className="select-none touch-none flex flex-col justify-center items-center max-w-screen-sm w-full p-4 py-12">
          <div className="text-3xl mb-6">🎉 클리어!</div>
          <AppleBox />
          <Button
            className="mt-6"
            onClick={() => {
              restart(); // 시드도 내부에서 랜덤하게 바뀜
              updateQueryParam("seed", useGameStore.getState().seed); // ✅ 최신 시드로 쿼리 갱신
            }}
          >
            다시 하기
          </Button>
        </div>
      </div>
    </>
  );
}
