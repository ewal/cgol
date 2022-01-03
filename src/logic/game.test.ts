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

  describe("judgementDay", () => {});
});
