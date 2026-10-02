import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { deferred, isPromise } from "../../src/helpers/promise.helper.ts";



describe("isPromise", () => {
  it("should return true for a real Promise instance", () => {
    assert.equal(isPromise(new Promise(() => { })), true);
  });

  it("should return true for an async function call", () => {
    async function asyncFn() {
      return 42;
    }

    assert.equal(isPromise(asyncFn()), true);
  });

  it("should return true for Promise.resolve()", () => {
    assert.equal(isPromise(Promise.resolve(123)), true);
  });

  it("should return true for a thenable object", () => {
    const thenable = { then() { } };

    assert.equal(isPromise(thenable), true);
  });

  it("should return true for a thenable function", () => {
    const thenable = Object.assign(() => { }, { then() { } });

    assert.equal(isPromise(thenable), true);
  });

  it("should return false for an object with a non-function then property", () => {
    assert.equal(isPromise({ then: 123 }), false);
  });

  it("should return false for a plain object", () => {
    assert.equal(isPromise({}), false);
  });

  it("should return false for primitives", () => {
    for (const value of [42, "promise", true, false, null, undefined]) {
      assert.equal(isPromise(value), false);
    }
  });

  it("should return false for an array", () => {
    assert.equal(isPromise([]), false);
  });

  it("should return false for a function (not a promise)", () => {
    function notAPromise() { }

    assert.equal(isPromise(notAPromise), false);
  });
});

describe("deferred", () => {
  it("should resolve the promise from the outside", async () => {
    const { promise, resolve } = deferred<number>();

    resolve(42);

    assert.equal(await promise, 42);
  });

  it("should reject the promise from the outside", async () => {
    const { promise, reject } = deferred();
    const error = new Error("fail");

    reject(error);

    await assert.rejects(promise, error);
  });

  it("should return a real Promise", () => {
    assert.ok(deferred().promise instanceof Promise);
  });
});
