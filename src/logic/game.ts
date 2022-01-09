import { EventDispatcher, IEvent } from "strongly-typed-events";
import Cell from "./cell";
import Grid from "./grid";
import Timer from "./timer";
import Util from "./utils";

export type GridDimension = {
  x: number;
  y: number;
};

type GameArgs = {
  refreshRate: number;
  gridDimension: GridDimension;
  initialAlive: number;
};

export enum GameEvent {
  INIT = "init",
  START = "start",
  STOP = "stop",
  UPDATE = "update",
  RESET = "reset",
  SETTING_CHANGE = "arg_change",
}

class Game {
  private static instance: Game;
  private _grid: Grid;
  private _timer: Timer;
  private _gameStateUpdateEvent = new EventDispatcher<Game, GameEvent>();
  private _running = false;
  private _refreshRate = 100;
  private _initialAlive = 100;
  private _gridDimension: GridDimension = { x: 10, y: 10 };
  // private _handOfGod = 0;

  private constructor() {
    this._grid = new Grid();
    this._timer = new Timer();
  }

  private handleTimerEvent(_timer: Timer, _message: string) {
    if (_message === "NEW_TICK") {
      Game.instance.runNewGeneration();
    }
  }

  private signal(message: GameEvent) {
    if (message) {
      this._gameStateUpdateEvent.dispatch(this, message);
    }
  }

  public runNewGeneration(): void {
    const cells = this._grid.cells;

    const matrix = this._grid.cells.map((row) => {
      return row.map((cell) => {
        const shouldLive = Util.judge(cell, cells);
        // Mutate or return new?
        return new Cell(cell.row, cell.order, shouldLive);
      });
    });

    this._grid.cells = matrix;
    this.signal(GameEvent.UPDATE);
  }

  public get onGameEvent(): IEvent<Game, GameEvent> {
    return this._gameStateUpdateEvent.asEvent();
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }

  public initialize(data: GameArgs) {
    this._initialAlive = data.initialAlive;
    this._refreshRate = data.refreshRate;
    this._gridDimension = data.gridDimension;
    this._grid.cells = this._grid.generateMatrix(data.gridDimension);
    this._grid.randomizeAliveCells(this._initialAlive);
    this._timer.onTimerEvent.subscribe(this.handleTimerEvent);

    this.signal(GameEvent.INIT);
  }

  start() {
    this._running = true;
    this._timer.start(this._refreshRate);
    this.signal(GameEvent.START);
  }

  stop() {
    this._running = false;
    this._timer.pause();
    this.signal(GameEvent.STOP);
  }

  reset() {
    this._running = false;
    this._timer.onTimerEvent.unsubscribe(this.handleTimerEvent);
    this._timer.reset();
    this.initialize({
      refreshRate: this._refreshRate,
      initialAlive: this._initialAlive,
      gridDimension: this._gridDimension,
    });
    this.signal(GameEvent.RESET);
  }

  get isRunning(): boolean {
    return this._running;
  }

  get initialAlive(): number {
    return this._initialAlive;
  }

  get timer(): Timer {
    return this._timer;
  }

  get grid(): Grid {
    return this._grid;
  }

  get generations(): number {
    return this._timer.ticks;
  }

  get gridDimension(): GridDimension {
    return this._gridDimension;
  }

  public faster(): void {
    const rate = this._refreshRate <= 50 ? 10 : 50;
    if (this._refreshRate > 10) {
      this._refreshRate = this._refreshRate - rate;
      this._timer.start(this._refreshRate);
      this.signal(GameEvent.SETTING_CHANGE);
    }
  }

  public slower(): void {
    const rate = this._refreshRate < 50 ? 10 : 50;

    this._refreshRate = this._refreshRate + rate;
    this._timer.start(this._refreshRate);
    this.signal(GameEvent.SETTING_CHANGE);
  }

  get refreshRate(): number {
    return this._refreshRate;
  }
}

export default Game;
