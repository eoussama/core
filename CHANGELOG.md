# Changelog

## 0.1.0

### Breaking changes

- `isPromise` now narrows to `PromiseLike<unknown>` instead of `Promise<unknown>`, since thenables are not guaranteed to have `catch` or `finally`. It also recognizes thenable functions.
- `tryCatch` and `tryCatchSync` wrap a thrown `null` or `undefined` in an `Error`, so a failure can no longer look like `[null, data]`.

### Features

- Async: `retry`, `withTimeout`, `deferred`, and an `AbortSignal` option for `wait`.
- Errors: `tryCatchSync`, `toError`, `invariant` and `TimeoutError`.
- `tryCatch` accepts a promise directly, and synchronous functions are now typed correctly.
- Type guards: `isNil`, `isDefined`, `isPrimitive`, `isFunction` and `isObject`.
- Types: `TMaybePromise`, `TPrettify`, `TDeepPartial`, `TBrand`, `TNonEmptyArray`, `TValueOf`, `TDeferred`, `TRetryOptions`, `TWaitOptions` and `TTimeoutOptions`.

### Fixes

- `@eoussama/dx` was a runtime dependency, which added about 40 MB to every install. The package now has no dependencies.
- `wait` no longer emits a `TimeoutNegativeWarning` for negative values, and clamps `NaN` and overly large delays.
- `exports` declares separate ESM and CommonJS type declarations, and the package is marked as side-effect free.

### Internal

- Build with tsdown, type check with TypeScript 7, test with `node:test`, and lint with `@eoussama/dx` 0.1.
- Publish to npm with trusted publishing and provenance.

## 0.0.4

- Add the `wait` timer helper.
