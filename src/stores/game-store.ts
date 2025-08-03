// engine-store.ts

import { Engine } from "@/lib/game/engine";
import { create } from "zustand";

const initialEngine = new Engine(10);

interface GameStore {
  engine: Engine;
  resetGame: () => void;
  startPos?: [number, number] | undefined;
  endPos?: [number, number] | undefined;
  currentPos?: [number, number]; // 추가
  setStartPos: (pos: [number, number] | undefined) => void;

  setEndPos: (pos: [number, number] | undefined) => void;
  setCurrentPos: (pos?: [number, number]) => void; // 추가
  boardState: number[][];

  appleSize?: number;
  setAppleSize: (v: number) => void;

  size: number;
  setSize: (size: number) => void;

  undo: () => void;

  restart: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  engine: initialEngine,

  boardState: initialEngine.getBoardState(),
  resetGame: () => initialEngine.resetBoard(),
  setStartPos: (pos: [number, number] | undefined) => {
    set({ startPos: pos });
  },
  setCurrentPos: (pos) => set({ currentPos: pos }), // 추가
  setEndPos: (pos: [number, number] | undefined) => {
    set({ endPos: pos });

    const { startPos, endPos, engine } = get();
    if (!startPos || !endPos) return;
    if (engine.onDrawRect(startPos, endPos)) {
      set({ boardState: engine.getBoardState() });
    }
  },

  setAppleSize: (v: number) => {
    set({ appleSize: v });
  },

  size: 10,
  setSize: (size: number) => {
    console.log(size);
    const engine = new Engine(size);
    set({ size, engine, boardState: engine.getBoardState() });
  },

  undo: () => {
    const { engine } = get();
    engine.undo();
    set({ boardState: engine.getBoardState() });
  },
  restart: () => {
    const { size } = get();
    const engine = new Engine(size);
    set({ engine, boardState: engine.getBoardState() });
  },
}));
