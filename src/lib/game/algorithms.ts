import { range, times } from "lodash";
import seedrandom from "seedrandom";
export function generateBoard(
  row: number,
  col: number,
  rectSum: number,
  maxCellNum: number,
  seed: string
): number[][] {
  const rng = seedrandom(String(seed));
  if (rectSum < maxCellNum) {
    throw Error("rectSum < maxCellNum");
  }
  const board = getRectIdBoard(row, col, maxCellNum, rng);
  const idCellMap: Record<number, [number, number][]> = {};
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < row; j++) {
      if (!idCellMap[board[i][j]]) {
        idCellMap[board[i][j]] = [];
      }
      idCellMap[board[i][j]].push([i, j]);
    }
  }

  for (const cells of Object.values(idCellMap)) {
    const partition = randomPartition(rectSum, cells.length, rng);

    cells.forEach((e, i) => {
      board[e[0]][e[1]] = partition[i];
    });
  }
  return board;
}

function getRectIdBoard(
  row: number,
  col: number,
  maxCellNum: number,
  rng: () => number
) {
  const board: number[][] = getZeros(row, col);
  let cnt = 1;

  while (true) {
    const emptyCells = findEmptyCells(board);
    if (emptyCells.length <= maxCellNum + 1) {
      fillRect(board, [0, 0], [board.length - 1, board[0].length - 1], cnt);
      break;
    }
    const cell = sampleWithRng(emptyCells, rng);

    if (!cell) {
      console.log("illegal");
      break;
    }
    const validRects = getValidRectsFrom(board, cell, maxCellNum);

    const endPoint = weightedSample(
      validRects.map((e) => [e[0], e[1]] as [number, number]),
      validRects.map((e) => e[2]),
      rng
    );

    if (!endPoint) {
      console.log("illegal");
      break;
    }

    fillRect(board, cell, endPoint, cnt++);
  }

  return board;
}

function findEmptyCells(
  board: number[][],
  start?: [number, number],
  end?: [number, number]
): [number, number][] {
  const row = board.length;
  const col = board[0].length;
  if (!start) {
    start = [0, 0];
  }
  if (!end) {
    end = [row - 1, col - 1];
  }

  const result: ReturnType<typeof findEmptyCells> = [];
  for (const i of customRange(start[0], end[0])) {
    for (const j of customRange(start[1], end[1])) {
      if (board[i][j] === 0) {
        result.push([i, j]);
      }
    }
  }
  return result;
}

function getValidRectsFromSide(
  board: number[][],
  coord: [number, number],
  i: number,
  maxCellNum: number
): [number, number][] {
  const rowRangeIdx = [coord[0], i].sort();
  rowRangeIdx[1] += 1;
  const rowRange = board.slice(...rowRangeIdx);

  const colsResult: [number, number][] = [];

  let currEmptyCells = 0;
  let j = coord[1];

  while (true) {
    if (j >= board[0].length) break;
    currEmptyCells += rowRange.map((e) => e[j]).filter((e) => !e).length;
    if (currEmptyCells > maxCellNum) break;
    if (currEmptyCells > 1 && (coord[0] !== i || coord[1] !== j)) {
      colsResult.push([j, 10 - currEmptyCells]);
    }
    j++;
  }

  if (currEmptyCells < 2) {
    colsResult.length = 0;
  }
  currEmptyCells = 0;
  j = coord[1];

  while (true) {
    if (j < 0) break;
    currEmptyCells += rowRange.map((e) => e[j]).filter((e) => !e).length;
    if (currEmptyCells > maxCellNum) break;
    if (currEmptyCells > 1 && (coord[0] !== i || coord[1] !== j)) {
      colsResult.push([j, (10 - currEmptyCells) * 10]);
    }

    j--;
  }

  return colsResult;
}

function getValidRectsFrom(
  board: number[][],
  coord: [number, number],
  maxCellNum: number
): [number, number, number][] {
  const row = board.length;

  const result: ReturnType<typeof getValidRectsFrom> = [];

  for (let i = 0; i < row; i++) {
    const cols = getValidRectsFromSide(board, coord, i, maxCellNum);

    result.push(...cols.map((col) => [i, ...col] as [number, number, number]));
  }

  return result;
}

function customRange(start: number, end: number) {
  if (start === end) return [start];
  const step = start < end ? 1 : -1;
  return range(start, end + step, step);
}

function fillRect(
  board: number[][],
  start: [number, number],
  end: [number, number],
  fill: number
) {
  for (const i of customRange(start[0], end[0])) {
    for (const j of customRange(start[1], end[1])) {
      if (!board[i][j]) {
        board[i][j] = fill;
      }
    }
  }
}

function randomPartition(n: number, k: number, rng: () => number): number[] {
  if (k <= 0 || k > n) throw new Error("Invalid k");

  const cuts = new Set<number>();
  while (cuts.size < k - 1) {
    const cut = Math.floor(rng() * (n - 1)) + 1; // [1, n-1]
    cuts.add(cut);
  }

  const sortedCuts = Array.from(cuts).sort((a, b) => a - b);
  const allCuts = [0, ...sortedCuts, n];
  const parts = [];

  for (let i = 1; i < allCuts.length; i++) {
    parts.push(allCuts[i] - allCuts[i - 1]);
  }

  return parts;
}

function weightedSample<T>(
  items: T[],
  weights: number[],
  rng: () => number
): T {
  if (items.length !== weights.length) {
    throw new Error("items and weights must have the same length");
  }

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  const r = rng() * totalWeight;

  let cumulative = 0;
  for (let i = 0; i < items.length; i++) {
    cumulative += weights[i];
    if (r < cumulative) {
      return items[i];
    }
  }

  // fallback
  return items[items.length - 1];
}

function sampleWithRng<T>(array: T[], rng: () => number): T | undefined {
  if (array.length === 0) return undefined;
  const idx = Math.floor(rng() * array.length);
  return array[idx];
}

export function getZeros(row: number, col: number) {
  return times(row, () => times(col, () => 0));
}
