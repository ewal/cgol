import Cell from "./cell";

describe("Cell", () => {
  it("can be constrcuted", () => {
    const cell = new Cell(0, 1, true);
    expect(cell.row).toBe(0);
    expect(cell.order).toBe(1);
    expect(cell.alive).toBeTruthy();
  });

  it("toggles the alive property", () => {
    const cell = new Cell(0, 1, true);
    cell.toggle();
    expect(cell.alive).toBeFalsy();
  });
});
