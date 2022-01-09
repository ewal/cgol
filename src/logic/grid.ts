import Cell from "./cell";
import { GridDimension } from "./game";

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

  public generateMatrix(gridDimension: GridDimension): Cell[][] {
    return new Array(gridDimension.y)
      .fill(0)
      .map((_n: unknown, index: number) => index)
      .map((rowIndex: number) => {
        return new Array(gridDimension.x)
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
