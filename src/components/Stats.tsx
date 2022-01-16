import "./Stats.css";
import React, { useEffect, useState } from "react";
import Game from "../logic/game";
import Dimensions from "./Stats/Dimensions";
import RefreshInterval from "./Stats/RefreshInterval";
import Generations from "./Stats/Generations";
import CellsState from "./Stats/CellsState";

const game = Game.getInstance();

const Stats: React.FC = () => {
  const [state, setState] = useState({
    interference: 0,
  });

  const startPercentage = (
    (game.initialAlive / (game.gridDimension.x * game.gridDimension.y)) *
    100
  ).toFixed(2);

  const handleStateUpdate = (instance: Game) => {
    setState({
      interference: instance.interference,
    });
  };

  useEffect(() => {
    game.onGameEvent.subscribe(handleStateUpdate);

    return () => game.onGameEvent.unsubscribe(handleStateUpdate);
  }, []);

  return (
    <dl className="stats">
      <dt>Grid</dt>
      <dd>
        <Dimensions />
      </dd>
      <dt>Initial living</dt>
      <dd>
        {Math.round(game.initialAlive)}
        <span className="sep">/</span>
        {startPercentage}
        <span className="sign">%</span>
      </dd>
      <dt>Living cells</dt>
      <dd>
        <CellsState />
      </dd>
      <dt>Refresh interval</dt>
      <dd>
        <RefreshInterval />
      </dd>
      <dt>Generations</dt>
      <dd>
        <Generations />
      </dd>
      <dt>Interference</dt>
      <dd>{state?.interference}</dd>
    </dl>
  );
};

export default Stats;
