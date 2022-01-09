import Grid from "./grid";

describe("Grid", () => {
  describe("generateMatrix", () => {
    it("generates a matrix of cells", () => {
      const grid = new Grid();
      grid.cells = grid.generateMatrix({
        x: 10,
        y: 10,
      });
      expect(grid.cells.length).toBe(10);
    });
  });

  describe("randomizeAliveCells", () => {
    it("sets a number of random cells to initially be alive", () => {
      const grid = new Grid();
      grid.cells = grid.generateMatrix({
        x: 10,
        y: 10,
      });
      grid.randomizeAliveCells(100);
      expect(grid.cells.flat().filter((c) => c.alive === true).length).toBe(
        100
      );
    });
  });
});
