import Game from "./game";
import Cell from "./cell";
import Util from "./utils";
import Grid from "./grid";

const findMedian = (arr = []) => {
  const sorted = arr.slice().sort((a, b) => {
    return a - b;
  });
  if (sorted.length % 2 === 0) {
    const first = sorted[sorted.length / 2 - 1];
    const second = sorted[sorted.length / 2];
    return (first + second) / 2;
  } else {
    const mid = Math.floor(sorted.length / 2);
    return sorted[mid];
  }
};

describe("Util", () => {
  describe("findNeighbourCells", () => {
    const game = Game.getInstance();

    beforeEach(() => {
      game.grid.cells = Game.getInstance().grid.generateMatrix({
        x: 20,
        y: 20,
      });
    });

    it("returns a list of Cell classes", () => {
      const neighbours = Util.findNeighbourCells(
        game.grid.cells[0][0],
        game.grid.cells
      );
      expect(neighbours[0]).toBeInstanceOf(Cell);
    });

    it("finds all neighbours for the first cell in the grid", () => {
      const neighbours = Util.findNeighbourCells(
        game.grid.cells[0][0],
        game.grid.cells
      );

      expect(neighbours.length).toBe(3);
    });

    it("returns all eight neighbours for a non edge cell", () => {
      const neighbours = Util.findNeighbourCells(
        game.grid.cells[2][2],
        game.grid.cells
      );
      expect(neighbours.length).toBe(8);
    });
  });

  /*
  describe("livingNeighbours", () => {
    it("should be fast", () => {
      const grid = new Grid();
      const cells = grid.generateMatrix({ x: 5000, y: 5000 });

      const cell = cells[5][5];

      const start = performance.now();
      Util.livingNeighbours(cell, cells);
      const end = performance.now();
      console.log("RESULT 1:", end - start);

      const start2 = performance.now();
      Util.livingNeighbours(cell, cells);
      const end2 = performance.now();
      console.log("RESULT 2:", end2 - start2);

      const start3 = performance.now();
      Util.livingNeighbours(cell, cells);
      const end3 = performance.now();
      console.log("RESULT 3:", end3 - start3);
    });
  });*/

  describe("shouldAwaken", () => {
    let grid: Grid;

    beforeAll(() => {
      grid = new Grid();
    });

    it("not awaken cell if less than 3 neighbours are alive", () => {
      const cells = grid.generateMatrix({
        x: 10,
        y: 10,
      });
      const cell = cells[0][0];
      cell.alive = Util.shouldAwaken(cell, cells);
      expect(cell.alive).toBeFalsy();
    });

    it("should awaken cell if there are exactly 3 living neighbours", () => {
      const cells = grid.generateMatrix({
        x: 10,
        y: 10,
      });
      const cell = cells[2][2];
      cell.alive = false;

      cells[1][1].alive = true;
      cells[1][2].alive = true;
      cells[1][3].alive = true;

      const shouldLive = Util.shouldAwaken(cell, cells);

      expect(shouldLive).toBeTruthy();
    });
  });

  describe("shouldDie", () => {
    let grid: Grid;

    beforeAll(() => {
      grid = new Grid();
    });

    it("dies when having fewer than two neighbours", () => {
      const cells = grid.generateMatrix({
        x: 10,
        y: 10,
      });
      const cell = cells[0][0];
      cell.alive = true;
      const shouldLive = Util.judge(cell, cells);
      expect(shouldLive).toBeFalsy();
    });

    it("survives if it has 2 living neighbours", () => {
      const cells = grid.generateMatrix({
        x: 10,
        y: 10,
      });
      const cell = cells[0][0];
      const neighbours = Util.findNeighbourCells(cell, cells);
      neighbours[0].alive = true;
      neighbours[1].alive = true;
      cell.alive = true;
      const shouldLive = Util.judge(cell, cells);
      expect(shouldLive).toBeTruthy();
    });

    it("survives if it has 3 living neighbours", () => {
      const cells = grid.generateMatrix({
        x: 10,
        y: 10,
      });
      const cell = cells[0][0];
      const neighbours = Util.findNeighbourCells(cell, cells);
      neighbours[0].alive = true;
      neighbours[1].alive = true;
      neighbours[2].alive = true;
      cell.alive = true;
      const shouldLive = Util.judge(cell, cells);
      expect(shouldLive).toBeTruthy();
    });

    it("dies if there are more than 3 neighbours", () => {
      const cells = grid.generateMatrix({
        x: 10,
        y: 10,
      });
      const cell = cells[2][2];
      const neighbours = Util.findNeighbourCells(cell, cells);
      neighbours[0].alive = true;
      neighbours[1].alive = true;
      neighbours[2].alive = true;
      neighbours[3].alive = true;
      cell.alive = true;
      const shouldLive = Util.judge(cell, cells);
      expect(shouldLive).toBeFalsy();
    });
  });

  describe("judge", () => {
    let grid: Grid;

    beforeAll(() => {
      grid = new Grid();
      Util.shouldAwaken = jest.fn();
      Util.shouldDie = jest.fn();
    });

    it("uses shouldAwaken when dead", () => {
      const cells = grid.generateMatrix({
        x: 10,
        y: 10,
      });
      const cell = cells[0][0];
      Util.judge(cell, cells);
      expect(Util.shouldAwaken).toHaveBeenCalled();
    });

    it("uses shouldDie when alive", () => {
      const cells = grid.generateMatrix({
        x: 10,
        y: 10,
      });
      const cell = cells[0][0];
      cell.alive = true;
      Util.judge(cell, cells);
      expect(Util.shouldDie).toHaveBeenCalled();
    });
  });
});
