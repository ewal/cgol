import "./App.css";

import React, { useEffect } from "react";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import Game from "./logic/game";
import Stats from "./components/Stats";

const App: React.FC = () => {
  useEffect(() => {
    Game.getInstance().initialize({
      refreshRate: 1000,
      gridDimension: {
        x: 80,
        y: 80,
      },
      initialAlive: 800,
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
