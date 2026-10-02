import type { TPrimitive } from "./primitive.type.ts";



/**
 * @description
 * Deep partial type
 * Makes every property optional, recursively
 *
 * @param T - The type to make deeply partial
 * @returns The deeply partial type
 */
export type TDeepPartial<T> = T extends TPrimitive | bigint | symbol | null | undefined | ((...args: Array<never>) => unknown)
  ? T
  : T extends Array<infer TItem>
    ? Array<TDeepPartial<TItem>>
    : T extends ReadonlyArray<infer TItem>
      ? ReadonlyArray<TDeepPartial<TItem>>
      : { [TKey in keyof T]?: TDeepPartial<T[TKey]> };
