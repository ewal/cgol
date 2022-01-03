import exp from "constants";
import { Grid } from "./game";

describe("Game logic", () => {
  describe("Grid constructor", () => {
    it("constructor has default argument values", () => {
      const grid = new Grid();
      expect(grid.size).toBe(10);
      expect(grid.initialAlive).toBe(10);
    });

    it("constructor can take arguments", () => {
      const grid = new Grid(20, 10);
      expect(grid.size).toBe(20);
      expect(grid.initialAlive).toBe(10);
    });

    it("generates a matrix of cells", () => {
      const grid = new Grid();
      expect(grid.cells.length).toBe(10);
    });

    it("sets a number of random cells to initially be alive", () => {
      const grid = new Grid();
      expect(grid.cells.flat().filter((c) => c.alive === true).length).toBe(10);
    });
  });

  describe("findNeighbourCells", () => {
    it("finds all neighbours for the first cell in the grid", () => {
      const grid = new Grid();
      const neighbours = grid.findNeighbourCells(grid.cells[0][0]);
      expect(neighbours.length).toBe(3);
    });

    it("returns all eight neighbours for a non edge cell", () => {
      const grid = new Grid();
      const neighbours = grid.findNeighbourCells(grid.cells[3][3]);
      expect(neighbours.length).toBe(8);
    });
  });

  describe("judgementDay", () => {
    describe("when having fewer than two neighbours", () => {
      it("dies", () => {
        const grid = new Grid(20, 20);
        const cell = grid.cells[0][0];
        cell.alive = true;
        const shouldLive = grid.judgementDay(cell);
        expect(shouldLive).toBeFalsy();
      });
    });

    describe("when having 2 neighbours", () => {
      it("survives", () => {
        const grid = new Grid(20, 20);
        const cell = grid.cells[0][0];
        const neighbours = grid.findNeighbourCells(cell);
        neighbours[0].alive = true;
        neighbours[1].alive = true;
        cell.alive = true;
        grid.judgementDay(cell);
        const shouldLive = grid.judgementDay(cell);
        expect(shouldLive).toBeTruthy();
      });
    });

    describe("when having 3 neighbours", () => {
      it("survives", () => {
        const grid = new Grid(20, 20);
        const cell = grid.cells[0][0];
        const neighbours = grid.findNeighbourCells(cell);
        neighbours[0].alive = true;
        neighbours[1].alive = true;
        neighbours[2].alive = true;
        cell.alive = true;
        grid.judgementDay(cell);
        const shouldLive = grid.judgementDay(cell);
        expect(shouldLive).toBeTruthy();
      });
    });

    describe("when there are more than 3 neighbours", () => {
      it("dies", () => {
        const grid = new Grid(20, 20);
        const cell = grid.cells[2][2];
        const neighbours = grid.findNeighbourCells(cell);
        neighbours[0].alive = true;
        neighbours[1].alive = true;
        neighbours[2].alive = true;
        neighbours[3].alive = true;
        cell.alive = true;
        const shouldLive = grid.judgementDay(cell);
        expect(shouldLive).toBeFalsy();
      });
    });

    describe("when dead but have three alive neighbours", () => {
      it("resurrects", () => {
        const grid = new Grid(10, 10);
        const cell = grid.cells[2][2];
        grid.cells.flat().forEach((c) => (c.alive = false));
        grid.cells[1][1].alive = true;
        grid.cells[1][2].alive = true;
        grid.cells[1][3].alive = true;
        cell.alive = false;
        const shouldLive = grid.judgementDay(cell);
        expect(shouldLive).toBeTruthy();
      });
    });
  });
});
