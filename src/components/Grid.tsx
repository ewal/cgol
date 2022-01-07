import React from "react";
import { useEffect, useState } from "react";
import Game, { GameEvent } from "../logic/game";
import { default as GameCell } from "../logic/cell";
import Row from "./Row";

const styles = (n: number) => ({
  gridTemplateRows: `repeat(${n}, 1fr)`,
});

const Grid: React.FC = () => {
  const [state, setState] = useState<GameCell[][]>();
  const game = Game.getInstance();

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
  }, [game.onGameEvent]);

  const rows = state?.map((gameRow, i) => {
    return <Row key={`row-${i}`} row={gameRow} />;
  });

  return (
    <div style={styles(game.gridSize)} className="matrix">
      {rows}
    </div>
  );
};

export default Grid;
