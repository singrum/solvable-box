// engine-store.ts

import { fire } from "@/lib/confetti";
import { Engine } from "@/lib/game/engine";
import { create } from "zustand";

const randomString = getRandomSeed();
const defaultSize = 5;
const initialEngine = new Engine(defaultSize, randomString);

interface GameStore {
  gameState: "playing" | "end";
  seed: string;
  engine: Engine;

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
  setSize: (size: number, seed: string) => void;

  undo: () => void;

  restart: () => void;

  setSeed: (value: string) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: "playing",
  seed: randomString,
  engine: initialEngine,

  boardState: initialEngine.getBoardState(),

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
      if (engine.board.every((row) => row.every((cell) => cell === 0))) {
        fire();
        set({ gameState: "end" });
      }
    }
  },

  setAppleSize: (v: number) => {
    set({ appleSize: v });
  },

  size: defaultSize,
  setSize: (size: number, seed: string) => {
    const engine = new Engine(size, seed);
    set({
      size,
      engine,
      boardState: engine.getBoardState(),
      seed: seed,
      gameState: "playing",
    });
  },

  undo: () => {
    const { engine } = get();
    engine.undo();
    set({ boardState: engine.getBoardState() });
  },
  restart: () => {
    const { size } = get();
    const randomString = getRandomSeed();
    const engine = new Engine(size, randomString);
    set({
      engine,
      boardState: engine.getBoardState(),
      seed: randomString,
      gameState: "playing",
    });
  },

  setSeed: (value: string) => {
    const { size } = get();

    const engine = new Engine(size, value);
    set({
      engine,
      boardState: engine.getBoardState(),
      seed: value,
      gameState: "playing",
    });
  },
}));

export function getRandomSeed() {
  return String(Math.floor(Math.random() * 10_000_000));
}
