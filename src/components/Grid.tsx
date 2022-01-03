import { useEffect, useState } from "react";
import { Grid as GameGrid, Cell as GameCell } from "../logic/game";
import Cell from "./Cell";
import Row from "./Row";

interface IProps {
  gameGrid: GameGrid;
}

const Grid: React.FC<IProps> = ({ gameGrid }) => {
  const [state, setState] = useState<GameCell[][]>();

  useEffect(() => {
    setState(gameGrid.cells);
  }, [gameGrid.cells]);

  const rows = state?.map((gameRow, i) => {
    return (
      <Row key={`row-${i}`}>
        {gameRow.map((gameCell) => (
          <Cell
            key={`cell-${gameCell.row}-${gameCell.order}`}
            row={gameCell.row}
            order={gameCell.order}
            alive={gameCell.alive}
          />
        ))}
      </Row>
    );
  });

  const handleClick = () => {
    gameGrid.cells[0][0].toggle();
    gameGrid.update();
    setState(gameGrid.cells);
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        Set
      </button>
      <table className="gameTable">
        <tbody>{rows}</tbody>
      </table>
    </>
  );
};

export default Grid;
