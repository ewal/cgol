import Timer from "./timer";

describe("timer", () => {
  it("runs 10 times and upates number of ticks", async () => {
    const timer = new Timer();
    timer.start(100);

    await new Promise((r) => setTimeout(r, 1000));
    timer.pause();

    expect(timer.ticks).toBe(9);
  });

  it("pauses the timer", async () => {
    const timer = new Timer();
    timer.start(100);

    await new Promise((r) => setTimeout(r, 300));
    timer.pause();
    await new Promise((r) => setTimeout(r, 300));

    expect(timer.ticks).toBe(2);
  });

  it("resets the timer", async () => {
    const timer = new Timer();
    timer.start(100);

    await new Promise((r) => setTimeout(r, 300));
    timer.reset();
    await new Promise((r) => setTimeout(r, 300));

    expect(timer.handler).toBe(0);
    expect(timer.ticks).toBe(0);
  });
});
