<p align="center">
  <img width="220" alt="Core logo" src="https://github.com/eoussama/core/blob/main/assets/logo.png?raw=true">
</p>

<p align="center">Lightweight, zero-dependency TypeScript utilities for Node.js and browsers.</p>

<p align="center">
    <a href="https://github.com/eoussama/core/blob/main/LICENSE" target="_blank"><img alt="License" src="https://img.shields.io/github/license/eoussama/core" /></a>
    <a href="https://github.com/eoussama/core/actions/workflows/publish.yml" target="_blank"><img alt="Publish workflow status" src="https://github.com/eoussama/core/actions/workflows/publish.yml/badge.svg" /></a>
    <a href="https://www.npmjs.com/package/@eoussama/core" target="_blank"><img alt="npm version" src="https://img.shields.io/npm/v/%40eoussama%2Fcore" /></a>
    <img alt="Code size" src="https://img.shields.io/github/languages/code-size/eoussama/core" />
</p>

## Description

**Core** provides a set of reusable utilities to streamline development in JavaScript and TypeScript projects. It is lightweight, has no dependencies, is fully tree-shakeable, and ships ESM and CommonJS builds with type declarations.

## Installation

Using [pnpm](https://pnpm.io):

```bash
pnpm add @eoussama/core
```

Or with npm:

```bash
npm install @eoussama/core
```

Or with yarn:

```bash
yarn add @eoussama/core
```

## Usage

```ts
// ESM
import { retry, tryCatch, withTimeout } from "@eoussama/core";



const [error, data] = await tryCatch(() => withTimeout(retry(() => fetch(url)), 5_000));
```

```js
// CommonJS
const { isDefined } = require("@eoussama/core");
```

## API

### Async

| Helper                             | Description                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------- |
| `wait(ms, { signal })`             | Resolve after `ms` milliseconds, abortable with an `AbortSignal`.           |
| `withTimeout(promise, ms, opts)`   | Reject with a `TimeoutError` when a promise does not settle in time.        |
| `retry(fn, opts)`                  | Retry a function with `retries`, `delay`, `shouldRetry` and `signal`.       |
| `deferred()`                       | Create a promise along with its `resolve` and `reject` functions.           |
| `isPromise(value)`                 | Check if a value is a promise or a thenable.                                |

### Errors

| Helper                             | Description                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------- |
| `tryCatch(fnOrPromise)`            | Resolve to `[null, data]` or `[error, null]` instead of throwing.           |
| `tryCatchSync(fn)`                 | Synchronous version of `tryCatch`.                                          |
| `toError(value)`                   | Convert any thrown value into an `Error`.                                   |
| `invariant(condition, message)`    | Throw when a condition is falsy, narrowing its type otherwise.              |
| `TimeoutError`                     | Error thrown by `withTimeout`.                                              |

### Type guards

| Helper                             | Description                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------- |
| `isNil(value)`                     | Check if a value is `null` or `undefined`.                                  |
| `isDefined(value)`                 | Check if a value is neither `null` nor `undefined`.                         |
| `isPrimitive(value)`               | Check if a value is a string, a number or a boolean.                        |
| `isFunction(value)`                | Check if a value is a function.                                             |
| `isObject(value)`                  | Check if a value is a non-null object that is not an array.                 |

### Types

`TNullable`, `TUnsafe`, `TPrimitive`, `TError`, `TResult`, `TSuccess`, `TFailure`, `TMaybePromise`, `TPrettify`, `TDeepPartial`, `TBrand`, `TNonEmptyArray`, `TValueOf`, `TDeferred`, `TRetryOptions`, `TWaitOptions` and `TTimeoutOptions`.

Refer to the [documentation](https://ouss.es/core) for a full API reference.

## Development

Requires Node.js `^22.18.0 || ^24.11.0 || >=26` and pnpm 12.

### Scripts

- `pnpm build` – Lint and build the package
- `pnpm test` – Run tests with coverage
- `pnpm typecheck` – Type check the codebase
- `pnpm lint` – Lint the codebase
- `pnpm fix` – Lint and auto-fix issues
- `pnpm doc` – Generate documentation
