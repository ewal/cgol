import React, { useEffect, useState } from "react";
import Game, { GameEvent } from "../../logic/game";

const game = Game.getInstance();

const CellsState: React.FC = () => {
  const [state, setState] = useState<number>(0);

  const handleStateUpdate = (instance: Game, message: GameEvent) => {
    if (
      message === GameEvent.SETTING_CHANGE ||
      message === GameEvent.INIT ||
      message === GameEvent.UPDATE
    ) {
      setState(instance.grid.activeCells.length);
    }
  };

  useEffect(() => {
    game.onGameEvent.subscribe(handleStateUpdate);

    return () => game.onGameEvent.unsubscribe(handleStateUpdate);
  }, []);

  const activePercentage = (
    (state / (game.gridDimension.x * game.gridDimension.y)) *
    100
  ).toFixed(2);

  return (
    <>
      {state}
      <span className="sep">/</span>
      {activePercentage}
      <span className="sign">%</span>
    </>
  );
};

export default CellsState;
