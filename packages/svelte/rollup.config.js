import svelte from "rollup-plugin-svelte";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

const config = {
  input: "src/index.js",
  output: {
    name: "CuriSvelte",
    sourcemap: false,
    globals: {
      "svelte/store": "svelte"
    }
  },
  plugins: [
    svelte({
      include: "src/**/*.html",
      store: true
    }),
    babel({
      exclude: "node_modules/**"
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    resolve(),
    commonjs({
      include: /node_modules/
    })
  ],
  external: ["svelte/store"]
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(uglify());
}

export default config;
