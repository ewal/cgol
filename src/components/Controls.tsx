import Game from "../logic/game";

const Controls: React.FC = () => {
  const game = Game.getInstance();

  const handleStartStop = () => {
    if (game.isRunning) {
      game.stop();
    } else {
      game.start();
    }
  };

  const handleReset = () => {
    game.reset();
  };

  const handleRandomize = () => {
    game.randomizeCells();
  };

  return (
    <div style={{ position: "absolute", right: 300 }}>
      <button type="button" onClick={handleStartStop}>
        Start / pause
      </button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
      <button type="button" onClick={handleRandomize}>
        Randomize
      </button>
    </div>
  );
};

export default Controls;
