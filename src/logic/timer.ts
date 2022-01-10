import { EventDispatcher, IEvent } from "strongly-typed-events";

export enum TimerEvent {
  TICK = "tick",
}

class Timer {
  private _ticks = 0;
  private _handler = 0;
  private _timerEvent = new EventDispatcher<Timer, string>();

  private signal(message: string) {
    if (message) {
      this._timerEvent.dispatch(this, message);
    }
  }

  start(timer: number) {
    let start = new Date().getTime();

    cancelAnimationFrame(this._handler);

    const loop = () => {
      const current = new Date().getTime();
      const delta = current - start;

      if (delta >= timer) {
        this._ticks = this._ticks + 1;
        start = new Date().getTime();
        this.signal(TimerEvent.TICK);
      }

      cancelAnimationFrame(this._handler);
      this._handler = requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  pause() {
    cancelAnimationFrame(this._handler);
  }

  reset() {
    this.pause();
    this._ticks = 0;
    this._handler = 0;
  }

  get onTimerEvent(): IEvent<Timer, string> {
    return this._timerEvent.asEvent();
  }

  get ticks(): number {
    return this._ticks;
  }

  get handler(): number {
    return this._handler;
  }
}

export default Timer;
