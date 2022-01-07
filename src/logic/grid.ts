import Cell from "./cell";
import Util from "./utils";

class Grid {
  cells: Cell[][] = [];

  public randomizeAliveCells(population: number): void {
    this.cells
      .flat()
      .map((x) => ({ x, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map((a) => a.x)
      .slice(0, population)
      .forEach((cell) => (cell.alive = true));
  }

  public updateCells(): void {
    this.cells = [...this.cells];
  }

  public killEmAll(): void {
    this.cells.flat().forEach((c) => (c.alive = false));
  }

  public generateMatrix(size: number): Cell[][] {
    return new Array(size)
      .fill(0)
      .map((_n: unknown, index: number) => index)
      .map((rowIndex: number) => {
        return new Array(size)
          .fill(0)
          .map(
            (_n: unknown, cellIndex: number) => new Cell(rowIndex, cellIndex)
          );
      });
  }

  public get activeCells(): Cell[] {
    return this.cells.flat().filter((c) => c.alive);
  }
}

export default Grid;
