import React, { useEffect, useState } from "react";
import Game, { GameEvent } from "../../logic/game";

const game = Game.getInstance();

const RefreshInterval: React.FC = () => {
  const [state, setState] = useState<number>(game.refreshRate);

  const handleStateUpdate = (instance: Game, message: GameEvent) => {
    if (message === GameEvent.SETTING_CHANGE || message === GameEvent.INIT) {
      setState(instance.refreshRate);
    }
  };

  useEffect(() => {
    game.onGameEvent.subscribe(handleStateUpdate);

    return () => game.onGameEvent.unsubscribe(handleStateUpdate);
  }, []);

  return (
    <>
      {state}
      <span className="sign">ms</span>
    </>
  );
};

export default RefreshInterval;
