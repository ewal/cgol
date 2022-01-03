import "./App.css";
import Grid from "./components/Grid";
import { Grid as GameGrid } from "./logic/game";

function App() {
  return <Grid gameGrid={new GameGrid(50, 200)} />;
}

export default App;
