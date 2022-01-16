import "./Grid.css";
import React from "react";
import { useEffect, useState } from "react";
import Game, { GameEvent } from "../logic/game";
import { default as GameCell } from "../logic/cell";
import Row from "./Row";
import { GridDimension } from "../logic/grid";

const styles = ({ width, height }: { width: number; height: number }) => ({
  width: `${width}vh`,
  height: `${height}vh`,
});

const game = Game.getInstance();

interface IProps {
  initialDimension: GridDimension;
}

const Grid: React.FC<IProps> = ({ initialDimension }) => {
  const [state, setState] = useState<GameCell[][]>();
  const [gridSize, setGridSize] = useState<{ width: number; height: number }>({
    width: 85, // viewport height
    height: 85, // viewport height
  });

  const onGameChange = (instance: Game, message: GameEvent): void => {
    if (
      message === GameEvent.SETTING_CHANGE ||
      message === GameEvent.INIT ||
      message === GameEvent.UPDATE
    ) {
      setState(instance.grid.cells);
    }

    if (message === GameEvent.SETTING_CHANGE) {
      const { x, y } = instance.gridDimension;

      if (x > y) {
        const perc = (y / x) * 100;
        const xp = Math.round((perc * 85) / 100);
        setGridSize({ width: 85, height: xp });
      } else if (y > x) {
        const perc = (x / y) * 100;
        const xp = Math.round((perc * 85) / 100);
        setGridSize({ width: xp, height: 85 });
      } else {
        setGridSize({ width: 85, height: 85 });
      }
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
    <div style={styles(gridSize)} className="matrix">
      {rows}
    </div>
  );
};

export default Grid;
