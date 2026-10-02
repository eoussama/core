/**
 * @description
 * Deferred type
 * A promise along with the functions that settle it
 *
 * @param T - The type of the resolved value
 * @returns The deferred type
 */
export type TDeferred<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
};
