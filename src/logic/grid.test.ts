import exp from "constants";
import Grid from "./grid";

describe("Grid", () => {
  describe("generateMatrix", () => {
    it("generates a matrix of cells", () => {
      const grid = new Grid();
      grid.cells = grid.generateMatrix(10);
      expect(grid.cells.length).toBe(10);
    });
  });

  describe("randomizeAliveCells", () => {
    it("sets a number of random cells to initially be alive", () => {
      const grid = new Grid();
      grid.cells = grid.generateMatrix(10);
      grid.randomizeAliveCells(100);
      expect(grid.cells.flat().filter((c) => c.alive === true).length).toBe(
        100
      );
    });
  });

  describe("killEmAll", () => {
    it("kills all cells", () => {
      const grid = new Grid();
      grid.cells = grid.generateMatrix(10);
      grid.randomizeAliveCells(100);
      grid.killEmAll();
      expect(grid.activeCells.length).toBe(0);
    });
  });
});
