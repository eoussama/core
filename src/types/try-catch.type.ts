export type TSuccess<T> = [T, null];
export type TFailure<T extends Error> = [null, T];
export type TResult<Err extends Error, Res> = TSuccess<Res> | TFailure<Err>;
