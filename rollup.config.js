import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
export default {
  input: "src/app.ts",
  output: {
    dir: "build",
    format: "cjs",
    sourcemap: true,
    chuckFileNames: "[name].chunk.js",
  },
  plugins: [
    del({ targets: [".build/*"], runOnce: true }),
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
      ],
      copyOnce: true,
    }),
    nodeResolve({
        extensions: [".ts", ".js", ".json", ".mjs"],
    }),

    commonjs(),

    json(),

    babel({
        extensions: [".ts", ".js", ".mjs"],
        babelHelpers: "bundled",
    }),

  ],
  watch: {
    exclude: ["node_modules"],
  },
};
