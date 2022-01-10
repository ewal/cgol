import "./Grid.css";
import React from "react";
import { useEffect, useState } from "react";
import Game, { GameEvent } from "../logic/game";
import { default as GameCell } from "../logic/cell";
import Row from "./Row";

const styles = (n: number) => ({
  gridTemplateRows: `repeat(${n}, 1fr)`,
});

const game = Game.getInstance();

const Grid: React.FC = () => {
  const [state, setState] = useState<GameCell[][]>();

  const onGameChange = (instance: Game, message: GameEvent): void => {
    if (message === GameEvent.INIT) {
      setState(instance.grid.cells);
    }

    if (message === GameEvent.UPDATE) {
      setState(instance.grid.cells);
    }
  };

  useEffect(() => {
    game.onGameEvent.subscribe(onGameChange);

    return () => {
      game.onGameEvent.unsubscribe(onGameChange);
    };
  }, []);

  const rows = state?.map((gameRow, index) => {
    return <Row key={`row-${index}`} row={gameRow} />;
  });

  return (
    <div style={styles(game.gridDimension.y)} className="matrix">
      {rows}
    </div>
  );
};

export default Grid;
