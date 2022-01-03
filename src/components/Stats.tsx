import React from "react";
import { Grid as GameGrid } from "../logic/game";

interface IProps {
  gameGrid: GameGrid;
}

const Stats: React.FC<IProps> = ({ gameGrid }) => {
  const gridSize = gameGrid.size * gameGrid.size;
  return (
    <div className="stats">
      Living cells: {gameGrid.activeCells.length} {" | "} Grid: {gridSize}x
      {gridSize} {" | "}
      Initialized with {gameGrid.initialAlive} living cells
    </div>
  );
};

export default React.memo(Stats);
