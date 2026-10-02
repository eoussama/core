import type { TError, TMaybePromise, TResult } from "../types/index.ts";

import { toError } from "./error.helper.ts";



/**
 * @description
 * Normalize a caught value so a failure can never look like a success.
 * Thrown null or undefined values are wrapped in an Error.
 *
 * @param error - The caught value
 * @returns The caught value, or an Error wrapping it when it is nullish
 */
function toFailure<TErr extends TError>(error: unknown): TErr {
  return (error ?? toError(error)) as TErr;
}

/**
 * @description
 * Try to catch the error of a function or a promise
 *
 * @param fn - The function (sync or async) or the promise to try to catch the error of
 * @returns A promise that resolves to [null, data] if it succeeds, or [error, null] if it throws or rejects
 */
export async function tryCatch<TErr extends TError, TRes>(fn: PromiseLike<TRes> | (() => TMaybePromise<TRes>)): Promise<TResult<TErr, TRes>> {
  try {
    const result = await (typeof fn === "function" ? fn() : fn);

    return [null, result];
  }
  catch (error) {
    return [toFailure<TErr>(error), null];
  }
}

/**
 * @description
 * Try to catch the error of a synchronous function
 *
 * @param fn - The function to try to catch the error of
 * @returns [null, data] if the function returns, or [error, null] if it throws
 */
export function tryCatchSync<TErr extends TError, TRes>(fn: () => TRes): TResult<TErr, TRes> {
  try {
    return [null, fn()];
  }
  catch (error) {
    return [toFailure<TErr>(error), null];
  }
}
