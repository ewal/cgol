import React from "react";
import Game from "../logic/game";
import { default as GameCell } from "../logic/cell";
import Cell from "./Cell";

const styles = (n: number) => ({
  gridTemplateColumns: `repeat(${n}, 1fr)`,
});

interface IProps {
  row: GameCell[];
}

const Row: React.FC<IProps> = ({ row }) => {
  const renderCell = (cell: GameCell) => (
    <Cell
      key={`cell-${cell.row}-${cell.order}`}
      alive={cell.alive}
      cell={cell}
    />
  );

  return (
    <div style={styles(Game.getInstance().gridSize)} className={"row"}>
      {row.map(renderCell)}
    </div>
  );
};

export default Row;
