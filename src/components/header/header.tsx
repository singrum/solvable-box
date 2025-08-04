import { Box } from "lucide-react";
import ActionGroup from "./action-group";

export default function Header() {
  return (
    <div className="space-y-2 max-w-screen-sm w-full mx-auto py-6 px-4 pb-0">
      <div className="flex justify-between">
        <div className="text-xl font-medium flex gap-2 items-center">
          <Box />
          Solvable Box
        </div>
        <ActionGroup />
      </div>
      <p className="text-xs">
        해결 가능한 문제들로 구성된{" "}
        <a
          href="https://www.gamesaien.com/game/fruit_box_a/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          후르츠 박스
        </a>
        의 클론.
      </p>
      <p className="text-xs">합이 10이 되도록 숫자들을 묶어 모두 없애세요!</p>
    </div>
  );
}
