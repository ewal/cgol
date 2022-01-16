import React, { useEffect, useState } from "react";
import Game, { GameEvent } from "../../logic/game";

const game = Game.getInstance();

const Dimensions: React.FC = () => {
  const [state, setState] = useState<number>(game.generations);

  const handleStateUpdate = (instance: Game, message: GameEvent) => {
    if (message === GameEvent.UPDATE || GameEvent.INIT) {
      setState(instance.generations);
    }
  };

  useEffect(() => {
    game.onGameEvent.subscribe(handleStateUpdate);

    return () => game.onGameEvent.unsubscribe(handleStateUpdate);
  }, []);

  return <>{state}</>;
};

export default Dimensions;
