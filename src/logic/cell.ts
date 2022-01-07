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

export default Cell;
