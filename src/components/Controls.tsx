import "./Controls.css";
import Game, { GameEvent } from "../logic/game";
import { useEffect, useState } from "react";

const game = Game.getInstance();

const Controls: React.FC = () => {
  const [state, setState] = useState({
    isRunning: false,
    dimension: { x: game.gridDimension.x, y: game.gridDimension.y },
    gameState: GameEvent.INIT,
    visuals: 0,
    generations: 0,
  });

  const handleStartStop = () => {
    if (state.isRunning) {
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

  const buttonText = () => {
    if (state.isRunning === false && state.generations === 0) {
      return "Start";
    }

    return state.isRunning ? "Pause" : "Continue";
  };

  const handleX = (e: React.FormEvent<HTMLInputElement>) => {
    game.gridDimension = {
      x: Number(e.currentTarget.value),
      y: state.dimension.y,
    };
  };

  const handleY = (e: React.FormEvent<HTMLInputElement>) => {
    game.gridDimension = {
      x: state.dimension.x,
      y: Number(e.currentTarget.value),
    };
  };

  const handleVisualChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log("E", e);
    setState({ ...state, visuals: Number(e.currentTarget.value) });
  };

  const handleGameEvent = (instance: Game, message: GameEvent): void => {
    if (
      message === GameEvent.SETTING_CHANGE ||
      message === GameEvent.INIT ||
      message === GameEvent.START ||
      message === GameEvent.STOP ||
      message === GameEvent.RESET
    ) {
      setState({
        isRunning: instance.isRunning,
        dimension: { x: instance.gridDimension.x, y: instance.gridDimension.y },
        gameState: message,
        visuals: 0,
        generations: instance.generations,
      });
    }
  };

  useEffect(() => {
    game.onGameEvent.subscribe(handleGameEvent);

    return () => game.onGameEvent.unsubscribe(handleGameEvent);
  }, []);

  return (
    <form className="controls">
      <fieldset className="dimensions">
        <legend>Settings</legend>
        <div className="con">
          <label>
            <span>X</span>
            <input
              onChange={handleX}
              value={state?.dimension.x}
              type="number"
              step="5"
              max="100"
              min="10"
              disabled={state.isRunning || state.generations > 0}
            />
          </label>
          <label>
            <span>Y</span>
            <input
              onChange={handleY}
              value={state?.dimension.y}
              type="number"
              step="5"
              max="100"
              min="10"
              disabled={state.isRunning || state.generations > 0}
            />
          </label>
        </div>
      </fieldset>
      <div className="sep" />
      <fieldset className="actions">
        <legend>Controls</legend>
        <button type="button" onClick={handleStartStop}>
          {buttonText()}
        </button>
        <div className="group">
          <button type="button" onClick={handleSlower}>
            Slower
          </button>
          <button type="button" onClick={handleFaster}>
            Faster
          </button>
        </div>
        <button type="button" onClick={handleReset} disabled={state.isRunning}>
          Reset
        </button>
      </fieldset>
      <fieldset className="visuals">
        <legend>Visuals</legend>
        <input
          type="range"
          value={state.visuals}
          onChange={handleVisualChange}
          min="1"
          max="100"
          aria-label="Trace cells"
        />
      </fieldset>
    </form>
  );
};

export default Controls;
