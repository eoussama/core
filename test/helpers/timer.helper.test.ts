import { wait } from "../../src/helpers/timer.helper";



describe("wait", () => {
  jest.setTimeout(5000);

  it("should resolve immediately for 0 ms", async () => {
    const start = Date.now();

    await wait(0);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeLessThan(20);
  });

  it("should resolve after approximately 100 ms", async () => {
    const start = Date.now();

    await wait(100);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeGreaterThanOrEqual(90);
    expect(elapsed).toBeLessThanOrEqual(120);
  });

  it("should not throw or reject for valid input", async () => {
    await expect(wait(50)).resolves.toBeUndefined();
  });

  it("should return a Promise", () => {
    const result = wait(10);

    expect(result).toBeInstanceOf(Promise);
  });

  it("should resolve multiple waits in parallel", async () => {
    const start = Date.now();

    await Promise.all([
      wait(50),
      wait(60),
      wait(70),
    ]);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeGreaterThanOrEqual(70);
    expect(elapsed).toBeLessThanOrEqual(100);
  });

  it("should resolve immediately for negative values", async () => {
    const start = Date.now();

    await wait(-100);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeLessThan(20);
  });
});
