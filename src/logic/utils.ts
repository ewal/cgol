import Cell from "./cell";

class Util {
  static readonly neighbourDirections: number[][] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  public static findNeighbourCells(cell: Cell, cells: Cell[][]): Cell[] {
    const { row, order } = cell;

    return this.neighbourDirections.flatMap(([rowMod, orderMod]) => {
      if (cells[row + rowMod]) {
        return cells[row + rowMod][order + orderMod] ?? [];
      }
      return [];
    });
  }

  public static livingNeighbours(cell: Cell, cells: Cell[][]): Cell[] {
    return this.findNeighbourCells(cell, cells).filter((n) => n.alive === true);
  }

  public static judge(cell: Cell, cells: Cell[][]): boolean {
    if (cell.alive) {
      return Util.shouldDie(cell, cells);
    }
    return Util.shouldAwaken(cell, cells);
  }

  public static shouldDie(cell: Cell, cells: Cell[][]): boolean {
    const nNeighbours = this.livingNeighbours(cell, cells).length;

    if (nNeighbours < 2 || nNeighbours > 3) {
      return false;
    }

    return true;
  }

  static shouldAwaken(cell: Cell, cells: Cell[][]): boolean {
    const neighbours = Util.livingNeighbours(cell, cells);
    if (neighbours.length === 3) {
      return true;
    }

    return false;
  }
}

export default Util;
