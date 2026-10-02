import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { tryCatch, tryCatchSync } from "../../src/helpers/try-catch.helper.ts";



describe("tryCatch", () => {
  it("should resolve and return [null, result]", async () => {
    assert.deepEqual(await tryCatch(async () => 42), [null, 42]);
  });

  it("should accept a synchronous function that returns a value", async () => {
    assert.deepEqual(await tryCatch(() => 42), [null, 42]);
  });

  it("should accept a promise directly", async () => {
    assert.deepEqual(await tryCatch(Promise.resolve("ok")), [null, "ok"]);
  });

  it("should reject and return [error, null]", async () => {
    const [error, result] = await tryCatch(async () => {
      throw new Error("fail");
    });

    assert.ok(error instanceof Error);
    assert.equal(error.message, "fail");
    assert.equal(result, null);
  });

  it("should return [error, null] for a rejected promise", async () => {
    const [error, result] = await tryCatch(Promise.reject(new Error("rejected")));

    assert.equal(error?.message, "rejected");
    assert.equal(result, null);
  });

  it("should catch a synchronous throw", async () => {
    const [error, result] = await tryCatch(() => {
      throw new Error("sync fail");
    });

    assert.ok(error instanceof Error);
    assert.equal(error.message, "sync fail");
    assert.equal(result, null);
  });

  it("should resolve with undefined and a null error", async () => {
    assert.deepEqual(await tryCatch(async () => undefined), [null, undefined]);
  });

  it("should keep a custom thrown object as the error", async () => {
    const customError = { code: 123, msg: "custom" };
    const [error, result] = await tryCatch(async () => {
      throw customError;
    });

    assert.equal(error, customError);
    assert.equal(result, null);
  });

  it("should wrap a thrown null or undefined so the failure is never mistaken for a success", async () => {
    for (const thrown of [null, undefined]) {
      const [error] = await tryCatch(async () => {
        throw thrown;
      });

      assert.ok(error instanceof Error);
      assert.equal(error.cause, thrown);
    }
  });
});

describe("tryCatchSync", () => {
  it("should return [null, result]", () => {
    assert.deepEqual(tryCatchSync(() => 42), [null, 42]);
  });

  it("should return [error, null] when the function throws", () => {
    const [error, result] = tryCatchSync(() => JSON.parse("{"));

    assert.ok(error instanceof SyntaxError);
    assert.equal(result, null);
  });

  it("should wrap a thrown undefined", () => {
    const [error] = tryCatchSync(() => {
      // eslint-disable-next-line no-throw-literal
      throw undefined;
    });

    assert.ok(error instanceof Error);
  });
});
