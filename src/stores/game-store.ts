// engine-store.ts

import { Engine } from "@/lib/game/engine";
import { create } from "zustand";

const innerGameStates = {
  engine: new Engine(),
};

interface GameStore {
  resetGame: () => void;
  startPos?: [number, number] | undefined;
  endPos?: [number, number] | undefined;
  setStartPos: (pos: [number, number] | undefined) => void;
  setEndPos: (pos: [number, number] | undefined) => void;
  boardState: number[][];
}

export const useGameStore = create<GameStore>((set, get) => ({
  boardState: innerGameStates.engine.getBoardState(),
  resetGame: () => innerGameStates.engine.resetBoard(),
  setStartPos: (pos: [number, number] | undefined) => {
    set({ startPos: pos });
  },
  setEndPos: (pos: [number, number] | undefined) => {
    set({ endPos: pos });

    const { startPos, endPos } = get();
    if (!startPos || !endPos) return;
    if (innerGameStates.engine.onDrawRect(startPos, endPos)) {
      set({ boardState: innerGameStates.engine.getBoardState() });
    }
  },
}));
