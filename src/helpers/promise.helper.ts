/**
 * @description Check if a value is a promise
 * @param value - The value to check
 * @returns True if the value is a promise, false otherwise
 *
 */
export function isPromise(value: unknown): value is Promise<unknown> {
  return Boolean(value && typeof value === "object" && "then" in value && typeof value.then === "function");
}
