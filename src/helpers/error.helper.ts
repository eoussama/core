/**
 * @description
 * Convert an unknown thrown value into an Error.
 * Errors are returned as is, anything else is wrapped and kept as the cause.
 *
 * @param value - The value to convert
 * @returns An Error instance
 */
export function toError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }

  if (typeof value === "string") {
    return new Error(value);
  }

  let message: string;

  try {
    message = JSON.stringify(value) ?? String(value);
  }
  catch {
    message = String(value);
  }

  return new Error(message, { cause: value });
}

/**
 * @description
 * Assert that a condition is truthy, narrowing its type
 *
 * @example
 * invariant(user, "User is required");
 * user.name; // user is no longer nullable
 *
 * @param condition - The condition to check
 * @param message - The error message, or a function that returns it
 * @throws Error if the condition is falsy
 */
export function invariant(condition: unknown, message?: string | (() => string)): asserts condition {
  if (!condition) {
    throw new Error(typeof message === "function" ? message() : (message ?? "Invariant failed"));
  }
}
