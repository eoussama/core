/**
 * @description
 * Non-empty array type
 * An array with at least one item
 *
 * @param T - The type of the items
 * @returns The non-empty array type
 */
export type TNonEmptyArray<T> = [T, ...Array<T>];
