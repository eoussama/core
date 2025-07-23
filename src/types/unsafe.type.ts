import type { TNullable } from "./nullable.type";



/**
 * @description
 * Unsafe type
 * The type infers the value as nullable or undefined
 *
 * @param T - The type to make unsafe
 * @returns The unsafe type
 */
export type TUnsafe<T> = TNullable<T> | undefined;
