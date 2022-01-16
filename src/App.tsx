import "./App.css";

import React, { useEffect } from "react";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import Game from "./logic/game";
import Stats from "./components/Stats";

const game = Game.getInstance();

const App: React.FC = () => {
  useEffect(() => {
    const initialAlive = game.gridDimension.x * game.gridDimension.y * 0.2;

    Game.getInstance().initialize({
      refreshRate: 50,
      gridDimension: game.gridDimension,
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
