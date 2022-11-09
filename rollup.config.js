import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import run from "@rollup/plugin-run";
import replace from "@rollup/plugin-replace";
// AKA, development mode
const isWatch = process.env.ROLLUP_WATCH === "true";
export default {
  input: "src/index.ts",
  output: {
    dir: "build",
    format: "cjs",
    sourcemap: true,
    chunkFileNames: "[name].chunk.js",
  },
  plugins: [
    del({ targets: ["build/*"], runOnce: true }),
    copy({
      targets: [
        {
          src: "package.json",
          dest: "build",
          copyOnce: true,
          transform(content) {
            const pkg = JSON.parse(content);
            delete pkg.scripts;
            delete pkg.devDependencies;
            delete pkg.envars;
            return JSON.stringify(pkg, null, " ");
          },
        },
        {
          src: [".pnp.cjs", ".yarnrc.yml", "yarn.lock"],
          dest: "build",
          copyOnce: true,
        },
      ],
      copyOnce: true,
    }),
    nodeResolve({
      preferBuiltins: true,
      extensions: [".ts", ".js", ".json", ".mjs"],
    }),

    commonjs(),

    json(),

    babel({
      extensions: [".ts", ".js", ".mjs"],
      babelHelpers: "bundled",
    }),
    !isWatch &&
      replace({
        "process.env.NODE_ENV": `production`,
        preventAssignment: true,
      }),

    isWatch &&
      run({
        execArgv: ["-r", "./.pnp.js", "-r", "source-map-support/register"],
      }),
  ],

  // Suppress warnings in 3rd party libraries
  onwarn(warning, warn) {
    if (warning.id?.includes("node_modules")) return;
    warn(warning);
  },
};
