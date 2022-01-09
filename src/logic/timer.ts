import { EventDispatcher, IEvent } from "strongly-typed-events";

class Timer {
  private _ticks = 0;
  private _handler = 0;
  private _timerEvent = new EventDispatcher<Timer, string>();

  public signal(message: string) {
    if (message) {
      this._timerEvent.dispatch(this, message);
    }
  }

  public start(timer: number) {
    let start = new Date().getTime();

    cancelAnimationFrame(this._handler);

    const loop = () => {
      const current = new Date().getTime();
      const delta = current - start;

      if (delta >= timer) {
        this._ticks = this._ticks + 1;
        start = new Date().getTime();
        this.signal("NEW_TICK");
      }

      this._handler = requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  public pause() {
    cancelAnimationFrame(this._handler);
  }

  public reset() {
    this.pause();
    this._ticks = 0;
    this._handler = 0;
  }

  public get onTimerEvent(): IEvent<Timer, string> {
    return this._timerEvent.asEvent();
  }

  public get ticks(): number {
    return this._ticks;
  }
}

export default Timer;
