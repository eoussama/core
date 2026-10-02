import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { retry } from "../../src/helpers/retry.helper.ts";



/**
 * @description
 * Create a function that fails a given number of times before succeeding
 *
 * @param failures - The number of times to fail
 * @returns The flaky function
 */
function flaky(failures: number): (attempt: number) => Promise<string> {
  return async (attempt) => {
    if (attempt <= failures) {
      throw new Error(`fail ${attempt}`);
    }

    return `ok ${attempt}`;
  };
}

describe("retry", () => {
  it("should resolve on the first attempt", async () => {
    assert.equal(await retry(flaky(0)), "ok 1");
  });

  it("should retry until the function succeeds", async () => {
    assert.equal(await retry(flaky(2)), "ok 3");
  });

  it("should accept synchronous functions", async () => {
    assert.equal(await retry(() => 42), 42);
  });

  it("should reject with the last error once retries run out", async () => {
    await assert.rejects(retry(flaky(10), { retries: 2 }), { message: "fail 3" });
  });

  it("should not retry when retries is 0", async () => {
    await assert.rejects(retry(flaky(1), { retries: 0 }), { message: "fail 1" });
  });

  it("should stop when shouldRetry returns false", async () => {
    const calls: Array<number> = [];

    await assert.rejects(retry(flaky(10), {
      shouldRetry: (_error, attempt) => {
        calls.push(attempt);

        return attempt < 2;
      },
    }), { message: "fail 2" });

    assert.deepEqual(calls, [1, 2]);
  });

  it("should compute the delay from the attempt and the error", async () => {
    const delays: Array<[number, string]> = [];

    await retry(flaky(2), {
      delay: (attempt, error) => {
        delays.push([attempt, (error as Error).message]);

        return 0;
      },
    });

    assert.deepEqual(delays, [[1, "fail 1"], [2, "fail 2"]]);
  });

  it("should wait for a fixed delay between attempts", async () => {
    const start = performance.now();

    await retry(flaky(1), { delay: 20 });

    assert.ok(performance.now() - start >= 15);
  });

  it("should reject when the signal is aborted before starting", async () => {
    const reason = new Error("aborted");

    await assert.rejects(retry(flaky(0), { signal: AbortSignal.abort(reason) }), reason);
  });

  it("should reject when the signal is aborted during a delay", async () => {
    const controller = new AbortController();
    const reason = new Error("aborted");
    const promise = retry(flaky(10), { delay: 1_000, signal: controller.signal });

    setTimeout(() => controller.abort(reason), 5);

    await assert.rejects(promise, reason);
  });
});
