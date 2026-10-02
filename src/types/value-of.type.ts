/**
 * @description
 * Value of type
 * Union of the values of an object type
 *
 * @param T - The object type
 * @returns The union of its values
 */
export type TValueOf<T> = T[keyof T];
