import { defineBuildConfig } from "unbuild";



export default defineBuildConfig({
  entries: ["src/index"],
  clean: true,
  declaration: true,
  outDir: "dist",
  rollup: {
    emitCJS: true,
  },
});
