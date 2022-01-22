import Game from "./game";
import Grid from "./grid";
import Timer from "./timer";

describe("Game", () => {
  describe("constructor", () => {
    let game: Game;

    beforeAll(() => {
      game = Game.getInstance();
    });

    test("it's a singleton, fyi", () => {
      expect(game).toBeInstanceOf(Game);
    });

    it("has a Grid class reference", () => {
      expect(game.grid).toBeInstanceOf(Grid);
    });

    it("has a Timer class reference", () => {
      expect(game.timer).toBeInstanceOf(Timer);
    });
  });
});
