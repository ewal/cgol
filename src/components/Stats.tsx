import React, { useEffect, useState } from "react";
import Game from "../logic/game";

const Stats: React.FC = () => {
  const [state, setState] = useState({ active: 0, generations: 0 });
  const game = Game.getInstance();

  const handleStateUpdate = (game: Game) => {
    setState({
      active: game.grid.activeCells.length,
      generations: game.generations,
    });
  };

  useEffect(() => {
    game.onGameEvent.subscribe(handleStateUpdate);
  }, [game.onGameEvent]);

  return (
    <dl className="stats">
      <dt>Grid</dt>
      <dd>
        <span>
          {game.gridSize}x{game.gridSize}
        </span>
      </dd>
      <dt>Initial cells</dt>
      <dd>
        <span>{game.initialAlive}</span>
      </dd>
      <dt>Living cells</dt>
      <dd>
        <span>{state?.active}</span>
      </dd>
      <dt>Generations</dt>
      <dd>
        <span>{state?.generations}</span>
      </dd>
    </dl>
  );
};

export default Stats;
