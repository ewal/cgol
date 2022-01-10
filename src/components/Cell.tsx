import "./Cell.css";
import { useCallback, memo } from "react";
import { default as GameCell } from "../logic/cell";
import Game from "../logic/game";

interface IProps {
  alive: boolean; // Enables usage of React.memo
  cell: GameCell;
}

const game = Game.getInstance();

const Cell: React.FC<IProps> = ({ alive, cell }) => {
  const handleClick = useCallback(() => {
    game.interfere(cell);
  }, [cell]);

  return (
    <div
      tabIndex={-1}
      className={["cell", alive && "alive"].join(" ")}
      onClick={handleClick}
    ></div>
  );
};

export default memo(Cell);
