<p align="center">
  <img width="220" src="https://github.com/eoussama/core/blob/main/assets/logo.png?raw=true">
</p>

<p align="center">Common JavaScript/TypeScript utilities for Node.js and browser environments.</p>

<p align="center">
    <a href="https://github.com/eoussama/core/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/eoussama/core" /></a>
    <a href="https://github.com/eoussama/core/actions/workflows/publish.yml" target="_blank"><img src="https://github.com/eoussama/core/actions/workflows/publish.yml/badge.svg" /></a>
    <a href="https://www.npmjs.com/package/@eoussama/core" target="_blank"><img src="https://img.shields.io/npm/v/%40eoussama%2Fdx" /></a>
    <img src="https://img.shields.io/github/languages/code-size/eoussama/core" />
</p>

## Description

**Core** provides a set of reusable utilities to streamline development in JavaScript and TypeScript projects. It is designed to be lightweight, modular, and easy to integrate into any codebase.

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

Import and use the utilities in your project:

```js
// ESM
import { someUtility1 } from "@eoussama/core";



// CommonJS
const { someUtility2 } = require("@eoussama/core");
```

Refer to the [documentation](https://ouss.es/core) for a full API reference.

## Development

### Scripts

- `pnpm build` – Build the package
- `pnpm test` – Run tests with coverage
- `pnpm lint` – Lint the codebase
- `pnpm fix` – Lint and auto-fix issues
- `pnpm docs` – Generate documentation
