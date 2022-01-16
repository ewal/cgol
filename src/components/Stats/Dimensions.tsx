import React, { useEffect, useState } from "react";
import Game, { GameEvent } from "../../logic/game";
import { GridDimension } from "../../logic/grid";

const game = Game.getInstance();

const Dimensions: React.FC = () => {
  const [state, setState] = useState<GridDimension>({
    x: game.gridDimension.x,
    y: game.gridDimension.y,
  });

  const handleStateUpdate = (instance: Game, message: GameEvent) => {
    if (message === GameEvent.SETTING_CHANGE || message === GameEvent.INIT) {
      setState(instance.gridDimension);
    }
  };

  useEffect(() => {
    game.onGameEvent.subscribe(handleStateUpdate);

    return () => game.onGameEvent.unsubscribe(handleStateUpdate);
  }, []);

  return (
    <>
      {state.x}
      <span className="sign times">x</span>
      {state.y}
    </>
  );
};

export default Dimensions;
