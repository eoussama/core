import type { TError } from "./error.type";



/**
 * @description
 * Success type
 *
 * @param T - The type of the result
 * @returns The success type
 */
export type TSuccess<T> = [null, T];

/**
 * @description
 * Failure type
 *
 * @param T - The type of the error
 * @returns The failure type
 */
export type TFailure<T extends TError> = [T, null];

/**
 * @description
 * Result type
 *
 * @param TErr - The type of the error
 * @param TRes - The type of the result
 * @returns The result type
 */
export type TResult<TErr extends TError, TRes> = TSuccess<TRes> | TFailure<TErr>;
