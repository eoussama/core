/**
 * @description
 * Prettify type
 * Flattens intersections into a single object type for readable hovers
 *
 * @param T - The type to prettify
 * @returns The prettified type
 */
export type TPrettify<T> = { [TKey in keyof T]: T[TKey] } & {};
