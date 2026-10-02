import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isDefined, isFunction, isNil, isObject, isPrimitive } from "../../src/helpers/guard.helper.ts";



describe("isNil", () => {
  it("should return true for null and undefined", () => {
    assert.equal(isNil(null), true);
    assert.equal(isNil(undefined), true);
  });

  it("should return false for falsy values that are not nullish", () => {
    for (const value of [0, "", false, Number.NaN]) {
      assert.equal(isNil(value), false);
    }
  });
});

describe("isDefined", () => {
  it("should return false for null and undefined", () => {
    assert.equal(isDefined(null), false);
    assert.equal(isDefined(undefined), false);
  });

  it("should return true for falsy values that are not nullish", () => {
    for (const value of [0, "", false]) {
      assert.equal(isDefined(value), true);
    }
  });

  it("should filter nullish values out of an array", () => {
    const values: Array<number> = [1, null, 2, undefined].filter(isDefined);

    assert.deepEqual(values, [1, 2]);
  });
});

describe("isPrimitive", () => {
  it("should return true for strings, numbers and booleans", () => {
    for (const value of ["", "a", 0, 1.5, true, false]) {
      assert.equal(isPrimitive(value), true);
    }
  });

  it("should return false for everything else", () => {
    for (const value of [null, undefined, {}, [], () => { }, 1n, Symbol("s")]) {
      assert.equal(isPrimitive(value), false);
    }
  });
});

describe("isFunction", () => {
  it("should return true for functions", () => {
    for (const value of [() => { }, function named() { }, async () => { }, class { }]) {
      assert.equal(isFunction(value), true);
    }
  });

  it("should return false for non-functions", () => {
    for (const value of [null, {}, [], "fn"]) {
      assert.equal(isFunction(value), false);
    }
  });
});

describe("isObject", () => {
  it("should return true for objects", () => {
    for (const value of [{}, { a: 1 }, new Date(), Object.create(null)]) {
      assert.equal(isObject(value), true);
    }
  });

  it("should return false for null, arrays, functions and primitives", () => {
    for (const value of [null, undefined, [], () => { }, "object", 1]) {
      assert.equal(isObject(value), false);
    }
  });
});
