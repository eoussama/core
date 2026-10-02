import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { invariant, toError } from "../../src/helpers/error.helper.ts";



describe("toError", () => {
  it("should return Error instances as is", () => {
    const error = new TypeError("fail");

    assert.equal(toError(error), error);
  });

  it("should use a string as the message", () => {
    assert.equal(toError("fail").message, "fail");
  });

  it("should serialize objects and keep them as the cause", () => {
    const value = { code: 42 };
    const error = toError(value);

    assert.equal(error.message, "{\"code\":42}");
    assert.equal(error.cause, value);
  });

  it("should handle values JSON cannot serialize", () => {
    const circular: Record<string, unknown> = {};

    circular.self = circular;

    assert.equal(toError(undefined).message, "undefined");
    assert.equal(toError(10n).message, "10");
    assert.equal(toError(Symbol("s")).message, "Symbol(s)");
    assert.equal(toError(circular).message, "[object Object]");
  });
});

describe("invariant", () => {
  it("should not throw for truthy conditions", () => {
    assert.doesNotThrow(() => invariant(1));
  });

  it("should throw a default message for falsy conditions", () => {
    assert.throws(() => invariant(0), { message: "Invariant failed" });
  });

  it("should throw the given message", () => {
    assert.throws(() => invariant(null, "Value is required"), { message: "Value is required" });
  });

  it("should only build a lazy message when the condition fails", () => {
    let calls = 0;
    const message = () => {
      calls++;

      return "Lazy message";
    };

    invariant(true, message);
    assert.equal(calls, 0);

    assert.throws(() => invariant(false, message), { message: "Lazy message" });
    assert.equal(calls, 1);
  });

  it("should narrow the type of the condition", () => {
    const value: string | undefined = "value";

    invariant(value);

    assert.equal(value.length, 5);
  });
});
