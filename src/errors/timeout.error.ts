/**
 * @description
 * Error thrown when an operation does not settle in time
 */
export class TimeoutError extends Error {
  override name = "TimeoutError";
}
