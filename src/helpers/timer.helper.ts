import type { TTimeoutOptions, TWaitOptions } from "../types/index.ts";

import { TimeoutError } from "../errors/index.ts";



/**
 * @description
 * Largest delay supported by setTimeout before it overflows
 */
const MAX_DELAY = 2_147_483_647;

/**
 * @description
 * Clamp a delay to the range supported by setTimeout
 *
 * @param ms - The delay in milliseconds
 * @returns The delay clamped between 0 and the maximum supported delay
 */
function toDelay(ms: number): number {
  return Number.isNaN(ms) ? 0 : Math.min(Math.max(ms, 0), MAX_DELAY);
}

/**
 * @description
 * Wait for a given number of milliseconds.
 * Negative and NaN values resolve on the next timer tick.
 *
 * @param ms - The number of milliseconds to wait.
 * @param options - The wait options.
 * @returns A promise that resolves when the time has passed, or rejects with the signal's reason when aborted.
 */
export function wait(ms: number, options: TWaitOptions = {}): Promise<void> {
  const { signal } = options;

  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);

      return;
    }

    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, toDelay(ms));

    function onAbort(): void {
      clearTimeout(timer);
      reject(signal?.reason);
    }

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * @description
 * Reject if a promise does not settle within a given number of milliseconds.
 * The original promise is not cancelled.
 *
 * @param promise - The promise to race against the timeout.
 * @param ms - The number of milliseconds to wait before rejecting.
 * @param options - The timeout options.
 * @returns A promise that settles like the original one, or rejects with a TimeoutError.
 */
export function withTimeout<T>(promise: PromiseLike<T>, ms: number, options: TTimeoutOptions = {}): Promise<T> {
  const { message = `Operation timed out after ${ms}ms` } = options;

  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new TimeoutError(message)), toDelay(ms));

    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}
