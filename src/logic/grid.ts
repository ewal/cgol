import Cell from "./cell";

export type GridDimension = {
  x: number;
  y: number;
};

class Grid {
  cells: Cell[][] = [];

  randomizeAliveCells(population: number): void {
    this.cells
      .flat()
      .map((x) => ({ x, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map((a) => a.x)
      .slice(0, population)
      .forEach((cell) => (cell.alive = true));
  }

  generateMatrix(gridDimension: GridDimension): Cell[][] {
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

  get activeCells(): Cell[] {
    return this.cells.flat().filter((c) => c.alive);
  }
}

export default Grid;
