import { cloneDeep, sum } from "lodash";
import { generateBoard } from "./algorithms";

export class Engine {
  width: number;
  height: number;
  board: number[][];
  history: number[][][];

  constructor(size: number, seed: string) {
    this.width = size;
    this.height = size;
    this.board = generateBoard(size, size, 10, 3, seed);
    this.history = [];
  }

  getInsideItems(
    startPos: [number, number],
    endPos: [number, number]
  ): [number, number][] {
    const items: [number, number][] = [];
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        if (
          isInsideSelectionBox(startPos, endPos, [
            j - (this.width - 1) / 2,
            i - (this.height - 1) / 2,
          ])
        ) {
          items.push([i, j]);
        }
      }
    }
    return items;
  }
  onDrawRect(startPos: [number, number], endPos: [number, number]) {
    const items = this.getInsideItems(startPos, endPos);
    if (sum(items.map(([i, j]) => this.board[i][j])) === 10) {
      this.saveHistory(cloneDeep(this.getBoardState()));
      items.forEach(([i, j]) => {
        this.board[i][j] = 0;
      });

      return true;
    } else {
      return false;
    }
  }
  getBoardState(): number[][] {
    return cloneDeep(this.board);
  }
  saveHistory(board: number[][]) {
    this.history.push(board);
  }
  undo() {
    if (this.history.length > 0) {
      this.board = this.history.pop()!;
    }
  }
}

function isInsideSelectionBox(
  startPos: [number, number],
  endPos: [number, number],
  point: [number, number]
): boolean {
  const [x1, y1] = startPos;
  const [x2, y2] = endPos;
  const [px, py] = point;

  const left = Math.min(x1, x2);
  const right = Math.max(x1, x2);
  const top = Math.min(y1, y2);
  const bottom = Math.max(y1, y2);

  return px >= left && px <= right && py >= top && py <= bottom;
}
