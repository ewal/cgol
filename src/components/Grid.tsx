import { useEffect, useState } from "react";
import { Grid as GameGrid, Cell as GameCell } from "../logic/game";
import Cell from "./Cell";
import Row from "./Row";
import Stats from "./Stats";

interface IProps {
  gameGrid: GameGrid;
}

const Grid: React.FC<IProps> = ({ gameGrid }) => {
  const [state, setState] = useState<GameCell[][]>();

  useEffect(() => {
    setState(gameGrid.cells);
  }, [gameGrid.cells]);

  useEffect(() => {
    const interval = setInterval(() => {
      gameGrid.runNewGeneration();
      gameGrid.updateCells();
      setState(gameGrid.cells);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const rows = state?.map((gameRow, i) => {
    return (
      <Row key={`row-${i}`}>
        {gameRow.map((gameCell) => (
          <Cell
            key={`cell-${gameCell.row}-${gameCell.order}`}
            cell={gameCell}
          />
        ))}
      </Row>
    );
  });

  return (
    <>
      <Stats gameGrid={gameGrid} />
      <div className="gameTable">{rows}</div>
    </>
  );
};

export default Grid;
