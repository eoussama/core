import type { TBrand, TDeepPartial, TMaybePromise, TNonEmptyArray, TPrettify, TResult, TValueOf } from "../src/index.ts";
import assert from "node:assert/strict";

import { describe, it } from "node:test";
import * as core from "../src/index.ts";



/**
 * @description
 * Compile-time check that two types are identical
 */
type TEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;

/**
 * @description
 * Compile-time assertion, fails type checking when given false
 *
 * @param _value - The result of a type-level check
 */
function expectType<T extends true>(_value?: T): void { }

describe("index", () => {
  it("should expose the public API", () => {
    assert.deepEqual(Object.keys(core).sort(), [
      "TimeoutError",
      "deferred",
      "invariant",
      "isDefined",
      "isFunction",
      "isNil",
      "isObject",
      "isPrimitive",
      "isPromise",
      "retry",
      "toError",
      "tryCatch",
      "tryCatchSync",
      "wait",
      "withTimeout",
    ]);
  });
});

describe("types", () => {
  it("should compute utility types", () => {
    type TUser = { id: number; tags: Array<string>; profile: { name: string } };

    expectType<TEqual<TValueOf<{ a: 1; b: "b" }>, 1 | "b">>();
    expectType<TEqual<TMaybePromise<number>, number | PromiseLike<number>>>();
    expectType<TEqual<TPrettify<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>>();
    expectType<TEqual<TDeepPartial<TUser>, { id?: number; tags?: Array<string>; profile?: { name?: string } }>>();
    expectType<TEqual<TResult<Error, number>, [null, number] | [Error, null]>>();

    // @ts-expect-error an empty tuple is not a non-empty array
    const empty: TNonEmptyArray<number> = [];
    // @ts-expect-error a plain string is not branded
    const id: TBrand<string, "UserId"> = "abc";

    assert.ok(empty && id);
  });
});
