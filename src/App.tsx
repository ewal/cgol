import "./App.css";

import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import Game from "./logic/game";
import Stats from "./components/Stats";
import GithubLogo from "./assets/img/GitHub-Mark-Light-64px.png";

const firebaseConfig =
  process.env.NODE_ENV === "production"
    ? {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID,
      }
    : {};

const game = Game.getInstance();

const App: React.FC = () => {
  useEffect(() => {
    const { x, y } = game.gridDimension;
    const initialAlive = x * y * 0.2;

    Game.getInstance().initialize({
      refreshRate: 50,
      gridDimension: game.gridDimension,
      initialAlive,
    });

    if (process.env.NODE_ENV === "production") {
      const app = initializeApp(firebaseConfig);
      getAnalytics(app);
    }
  }, []);

  return (
    <div className="grid">
      <aside className="left">
        <h1>Conway's GOL</h1>
        <div className="separator" />
        <Stats />
        <div className="separator" />
        <Controls />
        <code className="github-link">
          <img
            src={GithubLogo}
            style={{ width: 16, height: 16 }}
            alt="Github"
          />
          <a
            href="https://github.com/ewal/cgol"
            title="Github repository for the project"
          >
            ewal/cgol
          </a>
          /{" "}
          <a
            title="Wikipedia – Conway's game of life"
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          >
            About
          </a>
        </code>
      </aside>
      <main className="right">
        <Grid />
      </main>
    </div>
  );
};

export default App;
