import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
  output: {
    file: "dist/main.js"
  },
  plugins: [
    babel({
      presets: ["@babel/preset-react", "@babel/preset-flow"]
    }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    postcss()
  ]
};