import "./App.css";
import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import Game from "./logic/game";
import Stats from "./components/Stats";
import GithubLogo from "./assets/img/GitHub-Mark-Light-64px.png";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

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
