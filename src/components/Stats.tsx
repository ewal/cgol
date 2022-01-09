import "./Stats.css";
import React, { useEffect, useState } from "react";
import Game from "../logic/game";

const game = Game.getInstance();

const Stats: React.FC = () => {
  const [state, setState] = useState({
    active: 0,
    generations: 0,
    refreshRate: 0,
  });

  const activePercentage = (
    (state?.active / (game.gridDimension.x * game.gridDimension.y)) *
    100
  ).toFixed(2);

  const startPercentage = (
    (game.initialAlive / (game.gridDimension.x * game.gridDimension.y)) *
    100
  ).toFixed(2);

  const { gridDimension } = game;

  const handleStateUpdate = (game: Game) => {
    setState({
      active: game.grid.activeCells.length,
      generations: game.generations,
      refreshRate: game.refreshRate,
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
        {gridDimension.x}
        <span className="sign times">x</span>
        {gridDimension.y}
        <span className="sep">/</span>
        {game.gridDimension.x * game.gridDimension.y}
      </dd>
      <dt>Initial cells</dt>
      <dd>
        {game.initialAlive}
        <span className="sep">/</span>
        {startPercentage}
        <span className="sign">%</span>
      </dd>
      <dt>Living cells</dt>
      <dd>
        {state?.active}
        <span className="sep">/</span>
        {activePercentage}
        <span className="sign">%</span>
      </dd>
      <dt>Refresh interval</dt>
      <dd>
        {state?.refreshRate}
        <span className="sign">ms</span>
      </dd>
      <dt>Generations</dt>
      <dd>{state?.generations}</dd>
      <dt>Interference</dt>
      <dd>0</dd>
    </dl>
  );
};

export default Stats;
