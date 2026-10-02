import type { TMaybePromise, TRetryOptions } from "../types/index.ts";

import { wait } from "./timer.helper.ts";



/**
 * @description
 * Call a function until it succeeds or runs out of retries
 *
 * @example
 * const data = await retry(() => fetchData(), { retries: 3, delay: attempt => 100 * 2 ** attempt });
 *
 * @param fn - The function to call, receives the current attempt number starting at 1
 * @param options - The retry options
 * @returns A promise that resolves with the first successful result, or rejects with the last error
 */
export async function retry<T>(fn: (attempt: number) => TMaybePromise<T>, options: TRetryOptions = {}): Promise<T> {
  const { retries = 3, delay = 0, signal, shouldRetry } = options;

  const run = async (attempt: number): Promise<T> => {
    signal?.throwIfAborted();

    try {
      return await fn(attempt);
    }
    catch (error) {
      if (attempt > retries || (shouldRetry && !shouldRetry(error, attempt))) {
        throw error;
      }

      await wait(typeof delay === "function" ? delay(attempt, error) : delay, { signal });

      return run(attempt + 1);
    }
  };

  return run(1);
}
