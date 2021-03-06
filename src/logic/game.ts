import { EventDispatcher, IEvent } from "strongly-typed-events";
import Cell from "./cell";
import Grid, { GridDimension } from "./grid";
import Timer, { TimerEvent } from "./timer";
import Util from "./utils";

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
  private _gridDimension: GridDimension = { x: 50, y: 50 };
  private _handOfGod = 0;
  private _touchedByGod: Cell[] = [];

  private constructor() {
    this._grid = new Grid();
    this._timer = new Timer();
  }

  private handleTimerEvent(_timer: Timer, _message: string) {
    if (_message === TimerEvent.TICK) {
      Game.instance.runNewGeneration();
    }
  }

  private signal(message: GameEvent) {
    if (message) {
      this._gameStateUpdateEvent.dispatch(this, message);
    }
  }

  static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }

  initialize(data: GameArgs) {
    this._initialAlive = data.initialAlive;
    this._refreshRate = data.refreshRate;
    this._gridDimension = data.gridDimension;

    this._grid.cells = this._grid.generateMatrix(data.gridDimension);

    this._timer.onTimerEvent.subscribe(this.handleTimerEvent);

    this.signal(GameEvent.INIT);
  }

  runNewGeneration(): void {
    const cells = this._grid.cells;

    const matrix = cells.map((row) => {
      return row.map((cell) => {
        const shouldLive = Util.judge(cell, cells);
        return new Cell(cell.row, cell.order, shouldLive);
      });
    });

    this._grid.cells = matrix;
    this.signal(GameEvent.UPDATE);
  }

  start() {
    this._running = true;
    this._timer.start(this._refreshRate);
    if (this.generations === 0) {
      this._grid.randomizeAliveCells(this._initialAlive);
    }
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
    this._touchedByGod = [];
    this.initialize({
      refreshRate: this._refreshRate,
      initialAlive: this._initialAlive,
      gridDimension: this._gridDimension,
    });
    this.signal(GameEvent.RESET);
  }

  faster(): void {
    const rate = this._refreshRate <= 50 ? 10 : 50;

    if (this._refreshRate > 10) {
      this._refreshRate = this._refreshRate - rate;

      if (this.isRunning) {
        this._timer.start(this._refreshRate);
      }
    }

    this.signal(GameEvent.SETTING_CHANGE);
  }

  slower(): void {
    const rate = this._refreshRate < 50 ? 10 : 50;
    this._refreshRate = this._refreshRate + rate;

    if (this.isRunning) {
      this._timer.start(this._refreshRate);
    }

    this.signal(GameEvent.SETTING_CHANGE);
  }

  interfere(cell: Cell) {
    cell.toggle();

    this._touchedByGod = [...this._touchedByGod, cell];
    this._handOfGod = this._handOfGod + 1;

    if (!this._running) {
      const matrix = this._grid.cells.map((row) => {
        return row.map((c) => {
          if (c === cell) {
            return new Cell(cell.row, cell.order, cell.alive);
          }
          return c;
        });
      });
      this._grid.cells = matrix;
      this.signal(GameEvent.UPDATE);
    }
  }

  get isRunning(): boolean {
    return this._running;
  }

  get initialAlive(): number {
    return this._initialAlive;
  }

  set initialAlive(alive: number) {
    this._initialAlive = alive;
    this._grid.cells = this._grid.generateMatrix(this._gridDimension);

    this.signal(GameEvent.SETTING_CHANGE);
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

  set gridDimension(dimensions: GridDimension) {
    if (!this._running) {
      this._gridDimension = dimensions;
      this._grid.cells = this._grid.generateMatrix(dimensions);

      const initialAlive = dimensions.x * dimensions.y * 0.2;
      this._initialAlive = initialAlive;

      this.signal(GameEvent.SETTING_CHANGE);
    }
  }

  get onGameEvent(): IEvent<Game, GameEvent> {
    return this._gameStateUpdateEvent.asEvent();
  }

  get refreshRate(): number {
    return this._refreshRate;
  }

  get interference(): number {
    return this._handOfGod;
  }
}

export default Game;
