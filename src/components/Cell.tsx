interface IProps {
  row: number;
  order: number;
  alive: boolean;
}

const Cell: React.FC<IProps> = ({ row, order, alive }) => {
  return (
    <td className={["cell", alive && "alive"].join(" ")}>
      r:{row} o:{order}
    </td>
  );
};

export default Cell;
