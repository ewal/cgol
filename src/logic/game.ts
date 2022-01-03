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
      .forEach((cell) => (cell.alive = true));
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

  livingNeighbours(cell: Cell): Cell[] {
    return this.findNeighbourCells(cell).filter((n) => n.alive === true);
  }

  get activeCells(): Cell[] {
    return this.cells.flat().filter((c) => c.alive);
  }

  runNewGeneration(): void {
    const matrix = this.cells.map((row) => {
      return row.map((cell) => {
        const shouldLive = this.judgementDay(cell);
        return new Cell(cell.row, cell.order, shouldLive);
      });
    });

    this.cells = matrix;
  }

  judgementDay(cell: Cell): boolean | undefined {
    const neighbours = this.livingNeighbours(cell);

    if (cell.alive) {
      if (neighbours.length < 2) {
        return false;
      }
      if (neighbours.length === 2) {
        return true;
      }
      if (neighbours.length === 3) {
        return true;
      }
      if (neighbours.length > 3) {
        return false;
      }
    } else {
      if (neighbours.length === 3) {
        return true;
      }
    }
    return undefined;
  }

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

  constructor(row: number, order: number, alive = false) {
    this.row = row;
    this.order = order;
    this.alive = alive;
  }

  toggle(): void {
    this.alive = !this.alive;
  }
}

export { Grid, Cell };
