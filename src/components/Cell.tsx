interface IProps {
  alive: boolean;
}

const Cell: React.FC<IProps> = ({ alive }) => {
  return <div className={["cell", alive && "alive"].join(" ")}></div>;
};

export default Cell;
