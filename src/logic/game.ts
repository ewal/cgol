const modifiers = [
  [-1, -1],
  [-1, 0],
  [-1, +1],
  [0, -1],
  [0, +1],
  [+1, -1],
  [+1, 0],
  [+1, +1],
];

class Grid {
  size: number;
  initialAlive: number;
  cells: Cell[][];

  constructor(size = 10, initialAlive = 10) {
    this.size = size;
    this.initialAlive = initialAlive;
    this.cells = this.generateMatrix();
    this.randomizeAliveCells();
  }

  randomizeAliveCells(): void {
    this.cells
      .flat()
      .map((x) => ({ x, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map((a) => a.x)
      .slice(0, this.initialAlive)
      .forEach((cell) => cell.awaken());
  }

  updateCells(): void {
    this.cells = [...this.cells];
  }

  findNeighbourCells(cell: Cell): Cell[] {
    const { row, order } = cell;

    return modifiers.flatMap(([m1, m2]) => {
      if (row + m1 in this.cells && order + m2 in this.cells) {
        return this.cells[row + m1][order + m2];
      }
      return [];
    });
  }

  // shouldResurrect(cell: Cell): boolean {
  //   return false;
  // }

  judgementDay(cell: Cell, neighbours: Cell[]): void {}

  generateMatrix(): Cell[][] {
    return new Array(this.size)
      .fill(0)
      .map((_n: unknown, index: number) => index)
      .map((rowIndex: number) => {
        return new Array(this.size)
          .fill(0)
          .map(
            (_n: unknown, cellIndex: number) => new Cell(rowIndex, cellIndex)
          );
      });
  }
}

class Cell {
  row: number;
  order: number;
  alive: boolean;

  constructor(row: number, order: number) {
    this.row = row;
    this.order = order;
    this.alive = false;
  }

  toggle(): void {
    this.alive = !this.alive;
  }

  awaken(): void {
    this.alive = true;
  }

  kill(): void {
    this.alive = false;
  }
}

export { Grid, Cell };
