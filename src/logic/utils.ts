import Cell from "./cell";

class Util {
  // static readonly firstRowDir: number[][] = [
  //   [0, -1],
  //   [0, +1],
  //   [+1, -1],
  //   [+1, 0],
  //   [+1, +1],
  // ];

  // static readonly lastRowDir: number[][] = [
  //   [-1, -1],
  //   [-1, 0],
  //   [-1, +1],
  //   [0, -1],
  //   [0, +1],
  // ];

  static readonly neighbourDirections: number[][] = [
    [-1, -1],
    [-1, 0],
    [-1, +1],
    [0, -1],
    [0, +1],
    [+1, -1],
    [+1, 0],
    [+1, +1],
  ];

  private constructor() {}

  public static findNeighbourCells(cell: Cell, cells: Cell[][]): Cell[] {
    const { row, order } = cell;

    return this.neighbourDirections.flatMap(([m1, m2]) => {
      if (row + m1 in cells && order + m2 in cells) {
        return cells[row + m1][order + m2];
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
    const neighbours = this.livingNeighbours(cell, cells);

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

    return cell.alive;
  }

  static shouldAwaken(cell: Cell, cells: Cell[][]): boolean {
    const neighbours = Util.livingNeighbours(cell, cells);
    if (cell.alive === false && neighbours.length === 3) {
      return true;
    }

    return cell.alive;
  }
}

export default Util;
