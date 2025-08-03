export class Engine {
  width: number;
  height: number;
  board: number[][];
  constructor({ width, height }: { width: number; height: number }) {
    this.width = width;
    this.height = height;
  }
}
