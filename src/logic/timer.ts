import { EventDispatcher, IEvent } from "strongly-typed-events";

type TimerConstructorArgs = {
  timeout: number;
};

class Timer {
  private _interval: NodeJS.Timer;
  private _ticks: number;
  private _timerEvent = new EventDispatcher<Timer, string>();
  timeout: number;

  constructor(args: TimerConstructorArgs) {
    this.timeout = args.timeout;
    this._ticks = 0;
    this._interval = setInterval(() => {}, args.timeout);
  }

  public signal(message: string) {
    if (message) {
      this._timerEvent.dispatch(this, message);
    }
  }

  public start() {
    this._interval = setInterval(() => {
      this._ticks = this._ticks + 1;
      this.signal("tick");
    }, this.timeout);
  }

  public pause() {
    clearInterval(this._interval);
  }

  public get onTimerEvent(): IEvent<Timer, string> {
    return this._timerEvent.asEvent();
  }

  public get ticks(): number {
    return this._ticks;
  }
}

export default Timer;
