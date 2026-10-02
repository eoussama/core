import type { TDeferred } from "../types/index.ts";



/**
 * @description
 * Check if a value is a promise or a thenable
 *
 * @param value - The value to check
 * @returns True if the value is a promise or a thenable, false otherwise
 */
export function isPromise(value: unknown): value is PromiseLike<unknown> {
  return ((typeof value === "object" && value !== null) || typeof value === "function") && "then" in value && typeof value.then === "function";
}

/**
 * @description
 * Create a promise along with the functions that settle it
 *
 * @example
 * const { promise, resolve } = deferred<number>();
 * setTimeout(() => resolve(42), 100);
 * await promise; // 42
 *
 * @returns The promise and its resolve and reject functions
 */
export function deferred<T = void>(): TDeferred<T> {
  let resolve!: TDeferred<T>["resolve"];
  let reject!: TDeferred<T>["reject"];

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}
