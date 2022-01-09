import "./Cell.css";
import React from "react";
import { useCallback } from "react";
import { default as GameCell } from "../logic/cell";

interface IProps {
  alive: boolean; // Enables usage of React.memo
  cell: GameCell;
}

const Cell: React.FC<IProps> = ({ alive, cell }) => {
  const handleClick = useCallback(() => {
    cell.toggle();
  }, [cell]);

  return (
    <div
      tabIndex={-1}
      className={["cell", alive && "alive"].join(" ")}
      onClick={handleClick}
    ></div>
  );
};

export default React.memo(Cell);
