import { getRandomSeed, useGameStore } from "@/stores/game-store";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useMount = (): boolean => {
  const [isMounted, setIsMounted] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // 추가
  const setSize = useGameStore((s) => s.setSize);
  const setSeed = useGameStore((s) => s.setSeed);

  useEffect(() => {
    if (isMounted) return;

    let sizeParam = searchParams.get("size");
    let seedParam = searchParams.get("seed");

    // 기본값 설정
    if (!sizeParam) sizeParam = "10";
    if (!seedParam) seedParam = getRandomSeed();

    // URL에 기본값이 없다면 추가 (replace: true로 히스토리 누적 방지)
    if (!searchParams.has("size") || !searchParams.has("seed")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("size", sizeParam);
      params.set("seed", seedParam);
      navigate(`?${params.toString()}`, { replace: true });
    }

    const size = Number(sizeParam);
    if (!isNaN(size) && size >= 5 && size <= 19) {
      setSize(size, seedParam);
    }

    setIsMounted(true);
  }, [setSize, setSeed, searchParams, isMounted, navigate]);

  return isMounted;
};
