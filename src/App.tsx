import "./App.css";

import React, { useEffect } from "react";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import Game from "./logic/game";
import Stats from "./components/Stats";

const App: React.FC = () => {
  useEffect(() => {
    Game.getInstance().initialize({
      refreshRate: 100,
      size: 50,
      initialAlive: 500,
    });
  }, []);

  return (
    <>
      <Stats />
      <Controls />
      <Grid />
    </>
  );
};

export default App;
