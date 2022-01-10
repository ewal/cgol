import "./App.css";

import React, { useEffect } from "react";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import Game from "./logic/game";
import Stats from "./components/Stats";
import { GridDimension } from "./logic/grid";

const App: React.FC = () => {
  useEffect(() => {
    const gridDimension: GridDimension = { x: 50, y: 50 };
    const initialAlive = gridDimension.x * gridDimension.y * 0.15;

    Game.getInstance().initialize({
      refreshRate: 100,
      gridDimension,
      initialAlive,
    });
  }, []);

  return (
    <div className="grid">
      <aside className="left">
        <h1>Conway's GOL</h1>
        <div className="separator" />
        <Stats />
        <div className="separator" />
        <Controls />
      </aside>
      <main className="right">
        <Grid />
      </main>
    </div>
  );
};

export default App;
