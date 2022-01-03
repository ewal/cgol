import React from "react";
import { useCallback } from "react";
import { Cell as GameCell } from "../logic/game";

interface IProps {
  cell: GameCell;
}

const Cell: React.FC<IProps> = ({ cell }) => {
  const handleClick = useCallback(() => {
    cell.toggle();
  }, [cell]);

  return (
    <div
      tabIndex={-1}
      onClick={handleClick}
      className={["cell", cell.alive && "alive"].join(" ")}
    ></div>
  );
};

export default React.memo(Cell);
