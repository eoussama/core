import { tryCatch } from "../../src/helpers/try-catch.helper";



describe("tryCatch", () => {
  it("should resolve and return [result, null]", async () => {
    const fn = async () => 42;
    const [, result] = await tryCatch(fn);

    expect(result).toBe(42);
  });

  it("should resolve and return [result, null] with null error", async () => {
    const fn = async () => 42;
    const [error] = await tryCatch(fn);

    expect(error).toBeNull();
  });

  it("should reject and return [error, null]", async () => {
    const fn = async () => {
      throw new Error("fail");
    };
    const [error, result] = await tryCatch(fn);

    expect(error).toBeInstanceOf(Error);
    expect(result).toBeNull();
  });

  it("should reject and return error instance", async () => {
    const fn = async () => {
      throw new Error("fail");
    };
    const [error] = await tryCatch(fn);

    expect(error).toBeInstanceOf(Error);
  });

  it("should reject with error of type Error", async () => {
    const fn = async () => {
      throw new Error("fail");
    };
    const [error] = await tryCatch(fn);

    expect(error instanceof Error).toBe(true);
  });

  it("should return error with correct message when rejected", async () => {
    const fn = async () => {
      throw new Error("fail");
    };

    const [error] = await tryCatch(fn);

    if (!(error instanceof Error)) {
      fail("Error is not an instance of Error");

      return;
    }

    expect(error.message).toBe("fail");
  });

  it("should catch synchronous throw and return [null, error]", async () => {
    const fn = () => {
      throw new Error("sync fail");
    };
    const [, result] = await tryCatch(fn);

    expect(result).toBeNull();
  });

  it("should catch synchronous throw and return error instance", async () => {
    const fn = () => {
      throw new Error("sync fail");
    };
    const [error] = await tryCatch(fn);

    expect(error).toBeInstanceOf(Error);
  });

  it("should catch synchronous throw with error of type Error", async () => {
    const fn = () => {
      throw new Error("sync fail");
    };
    const [error] = await tryCatch(fn);

    expect(error instanceof Error).toBe(true);
  });

  it("should return error with correct message when thrown synchronously", async () => {
    const fn = () => {
      throw new Error("sync fail");
    };

    const [error] = await tryCatch(fn);

    if (!(error instanceof Error)) {
      fail("Error is not an instance of Error");

      return;
    }

    expect(error.message).toBe("sync fail");
  });

  it("should resolve with undefined", async () => {
    const fn = async () => undefined;
    const [, result] = await tryCatch(fn);

    expect(result).toBeUndefined();
  });

  it("should resolve with undefined and null error", async () => {
    const fn = async () => undefined;
    const [error] = await tryCatch(fn);

    expect(error).toBeNull();
  });

  it("should reject with a custom error object", async () => {
    const customError = { code: 123, msg: "custom" };
    const fn = async () => {
      throw customError;
    };
    const [, result] = await tryCatch(fn);

    expect(result).toBeNull();
  });

  it("should reject with a custom error object as error", async () => {
    const customError = { code: 123, msg: "custom" };
    const fn = async () => {
      throw customError;
    };
    const [error] = await tryCatch(fn);

    expect(error).toBe(customError);
  });
});
