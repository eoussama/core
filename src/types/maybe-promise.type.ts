/**
 * @description
 * Maybe promise type
 * The value can be returned directly or through a promise
 *
 * @param T - The type of the value
 * @returns The maybe promise type
 */
export type TMaybePromise<T> = T | PromiseLike<T>;
