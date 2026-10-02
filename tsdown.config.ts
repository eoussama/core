import { defineConfig } from "tsdown";



export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  platform: "neutral",
  target: "es2022",
  fixedExtension: true,
  dts: true,
  clean: true,
  outputOptions: {
    // JSDoc already ships in the declaration files, keep the runtime code lean.
    comments: { jsdoc: false, legal: true, annotation: true },
  },
});
