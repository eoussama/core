import type { TPrimitive } from "../types/index.ts";



/**
 * @description
 * Check if a value is null or undefined
 *
 * @param value - The value to check
 * @returns True if the value is null or undefined, false otherwise
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * @description
 * Check if a value is neither null nor undefined
 *
 * @example
 * [1, null, 2, undefined].filter(isDefined); // number[]
 *
 * @param value - The value to check
 * @returns True if the value is neither null nor undefined, false otherwise
 */
export function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

/**
 * @description
 * Check if a value is a primitive (string, number or boolean)
 *
 * @param value - The value to check
 * @returns True if the value is a primitive, false otherwise
 */
export function isPrimitive(value: unknown): value is TPrimitive {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}

/**
 * @description
 * Check if a value is a function
 *
 * @param value - The value to check
 * @returns True if the value is a function, false otherwise
 */
export function isFunction(value: unknown): value is (...args: Array<unknown>) => unknown {
  return typeof value === "function";
}

/**
 * @description
 * Check if a value is a non-null object that is not an array
 *
 * @param value - The value to check
 * @returns True if the value is a non-null, non-array object, false otherwise
 */
export function isObject(value: unknown): value is Record<PropertyKey, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
