import type { TError, TResult } from "../types";



/**
 * @description
 * Try to catch the of a function
 *
 * @param fn - The function to try to catch the error of
 * @returns A promise that resolves to an array of [data, null] if the promise resolves, or [null, error] if the promise rejects
 */
export async function tryCatch<TErr extends TError, TRes>(fn: (...args: Array<unknown>) => Promise<TRes>): Promise<TResult<TErr, TRes>> {
  try {
    const result = await fn();

    return [null, result];
  }
  catch (error) {
    return [error as TErr, null];
  }
}
