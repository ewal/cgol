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

  update(): void {
    this.cells = [...this.cells];
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
