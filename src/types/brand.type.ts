/**
 * @description
 * Unique key used to tag branded types
 */
declare const brand: unique symbol;

/**
 * @description
 * Branded (nominal) type, prevents mixing values that share the same underlying type
 *
 * @example
 * type TUserId = TBrand<string, "UserId">;
 * const id = "abc" as TUserId;
 *
 * @param T - The underlying type
 * @param TName - The brand name
 * @returns The branded type
 */
export type TBrand<T, TName extends string> = T & { readonly [brand]: TName };
