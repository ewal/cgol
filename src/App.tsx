import "./App.css";
import Grid from "./components/Grid";
import { Grid as GameGrid } from "./logic/game";

function App() {
  return (
    <div className="App">
      <Grid gameGrid={new GameGrid(10, 10)} />
    </div>
  );
}

export default App;
