import { EventDispatcher, IEvent } from "strongly-typed-events";
import Cell from "./cell";
import Grid from "./grid";
import Timer from "./timer";
import Util from "./utils";

type GameArgs = {
  refreshRate: number;
  size: number;
  initialAlive: number;
};

export enum GameEvent {
  INIT = "init",
  START = "start",
  STOP = "stop",
  UPDATE = "update",
  RESET = "reset",
}

class Game {
  private static instance: Game;
  private _grid: Grid;
  private _timer: Timer;
  private _gameStateUpdateEvent = new EventDispatcher<Game, GameEvent>();
  private _running = false;
  private _refreshRate = 200;
  private _initialAlive = 100;
  private _generations = 0;
  private _gridSize = 0;

  private constructor() {
    this._grid = new Grid();
    this._timer = new Timer({ timeout: this._refreshRate });
  }

  private handleTimerEvent(_timer: Timer, _message: string) {
    Game.instance.runNewGeneration();
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

    this._generations = this._generations + 1;
    this._grid.cells = matrix;
    this.signal(GameEvent.UPDATE);
  }

  public get onGameEvent(): IEvent<Game, GameEvent> {
    return this._gameStateUpdateEvent.asEvent();
  }

  public signal(message: GameEvent) {
    if (message) {
      this._gameStateUpdateEvent.dispatch(this, message);
    }
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
    this._gridSize = data.size;
    this._timer.timeout = data.refreshRate;

    this._grid.cells = this._grid.generateMatrix(data.size);
    this._grid.randomizeAliveCells(this._initialAlive);
    this._timer.onTimerEvent.subscribe(this.handleTimerEvent);

    this.signal(GameEvent.INIT);
  }

  start() {
    this._running = true;
    this._timer.start();
    this.signal(GameEvent.START);
  }

  stop() {
    this._running = false;
    this._timer.pause();
    this.signal(GameEvent.STOP);
  }

  reset() {
    this._running = false;
    this._generations = 0;
    this._timer.onTimerEvent.unsubscribe(this.handleTimerEvent);
    this.signal(GameEvent.RESET);
  }

  randomizeCells() {
    this._grid.killEmAll();
    this._grid.randomizeAliveCells(this._initialAlive);
    this._grid.updateCells();
    this.signal(GameEvent.UPDATE);
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
    return this._generations;
  }

  get gridSize(): number {
    return this._gridSize;
  }
}

export default Game;
