import "./Controls.css";
import Game from "../logic/game";

const game = Game.getInstance();

const Controls: React.FC = () => {
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

  const handleFaster = () => {
    game.faster();
  };

  const handleSlower = () => {
    game.slower();
  };

  return (
    <div className="controls">
      <button type="button" onClick={handleStartStop}>
        Start / pause
      </button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
      <div className="group">
        <button type="button" onClick={handleSlower}>
          Slower
        </button>
        <button type="button" onClick={handleFaster}>
          Faster
        </button>
      </div>
    </div>
  );
};

export default Controls;
