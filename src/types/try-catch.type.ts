import type { TError } from "./error.type";



export type TSuccess<T> = [null, T];
export type TFailure<T extends TError> = [T, null];
export type TResult<TErr extends TError, TRes> = TSuccess<TRes> | TFailure<TErr>;
