import { isPromise } from "../../src/helpers/promise.helper";



describe("isPromise", () => {
  it("should return true for a real Promise instance", () => {
    expect(isPromise(new Promise(() => { }))).toBe(true);
  });

  it("should return true for an async function call", () => {
    async function asyncFn() {
      return 42;
    }

    expect(isPromise(asyncFn())).toBe(true);
  });

  it("should return true for Promise.resolve()", () => {
    expect(isPromise(Promise.resolve(123))).toBe(true);
  });

  it("should return true for a thenable object", () => {
    const thenable = { then() { } };

    expect(isPromise(thenable)).toBe(true);
  });

  it("should return false for an object with a non-function then property", () => {
    const fakeThenable = { then: 123 };

    expect(isPromise(fakeThenable)).toBe(false);
  });

  it("should return false for a plain object", () => {
    expect(isPromise({})).toBe(false);
  });

  it("should return false for a number", () => {
    expect(isPromise(42)).toBe(false);
  });

  it("should return false for a string", () => {
    expect(isPromise("promise")).toBe(false);
  });

  it("should return false for true", () => {
    expect(isPromise(true)).toBe(false);
  });

  it("should return false for false", () => {
    expect(isPromise(false)).toBe(false);
  });

  it("should return false for null", () => {
    expect(isPromise(null)).toBe(false);
  });

  it("should return false for undefined", () => {
    expect(isPromise(undefined)).toBe(false);
  });

  it("should return false for an array", () => {
    expect(isPromise([])).toBe(false);
  });

  it("should return false for a function (not a promise)", () => {
    function notAPromise() { }
    expect(isPromise(notAPromise)).toBe(false);
  });
});
