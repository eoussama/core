import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it, mock } from "node:test";

import { TimeoutError } from "../../src/errors/timeout.error.ts";
import { wait, withTimeout } from "../../src/helpers/timer.helper.ts";



/**
 * @description
 * Check whether a promise has settled without waiting for it
 *
 * @param promise - The promise to inspect
 * @returns True if the promise settled, false otherwise
 */
async function isSettled(promise: Promise<unknown>): Promise<boolean> {
  let settled = false;

  promise.then(() => settled = true, () => settled = true);
  await new Promise(resolve => setImmediate(resolve));

  return settled;
}

describe("wait", () => {
  beforeEach(() => mock.timers.enable({ apis: ["setTimeout"] }));
  afterEach(() => mock.timers.reset());

  it("should resolve after the given time", async () => {
    const promise = wait(100);

    mock.timers.tick(99);
    assert.equal(await isSettled(promise), false);

    mock.timers.tick(1);
    assert.equal(await isSettled(promise), true);
  });

  it("should resolve with undefined", async () => {
    const promise = wait(50);

    mock.timers.tick(50);

    assert.equal(await promise, undefined);
  });

  it("should return a Promise", () => {
    assert.ok(wait(10) instanceof Promise);
  });

  it("should resolve parallel waits independently", async () => {
    const short = wait(50);
    const long = wait(70);

    mock.timers.tick(50);
    assert.equal(await isSettled(short), true);
    assert.equal(await isSettled(long), false);

    mock.timers.tick(20);
    assert.equal(await isSettled(long), true);
  });

  it("should resolve immediately for negative and NaN values", async () => {
    const negative = wait(-100);
    const nan = wait(Number.NaN);

    mock.timers.tick(0);

    assert.equal(await isSettled(negative), true);
    assert.equal(await isSettled(nan), true);
  });

  it("should reject with the signal reason when aborted", async () => {
    const controller = new AbortController();
    const promise = wait(100, { signal: controller.signal });
    const reason = new Error("aborted");

    controller.abort(reason);

    await assert.rejects(promise, reason);
  });

  it("should reject immediately when the signal is already aborted", async () => {
    const reason = new Error("aborted");

    await assert.rejects(wait(100, { signal: AbortSignal.abort(reason) }), reason);
  });

  it("should resolve and detach from a signal that is never aborted", async () => {
    const controller = new AbortController();
    const promise = wait(10, { signal: controller.signal });

    mock.timers.tick(10);
    await promise;

    controller.abort();
    assert.equal(await isSettled(promise), true);
  });
});

describe("withTimeout", () => {
  beforeEach(() => mock.timers.enable({ apis: ["setTimeout"] }));
  afterEach(() => mock.timers.reset());

  it("should resolve with the value when the promise settles in time", async () => {
    assert.equal(await withTimeout(Promise.resolve(42), 100), 42);
  });

  it("should reject with the original error when the promise rejects in time", async () => {
    const error = new Error("fail");

    await assert.rejects(withTimeout(Promise.reject(error), 100), error);
  });

  it("should reject with a TimeoutError when the promise takes too long", async () => {
    const promise = withTimeout(new Promise(() => { }), 100);

    mock.timers.tick(100);

    await assert.rejects(promise, (error: unknown) => {
      assert.ok(error instanceof TimeoutError);
      assert.equal(error.name, "TimeoutError");
      assert.equal(error.message, "Operation timed out after 100ms");

      return true;
    });
  });

  it("should use a custom message", async () => {
    const promise = withTimeout(new Promise(() => { }), 10, { message: "Too slow" });

    mock.timers.tick(10);

    await assert.rejects(promise, { name: "TimeoutError", message: "Too slow" });
  });

  it("should accept thenables", async () => {
    const thenable: PromiseLike<number> = { then: (onFulfilled, _onRejected) => Promise.resolve(onFulfilled?.(7)) as never };

    assert.equal(await withTimeout(thenable, 10), 7);
  });
});
