let sveltePlugin = require("rollup-plugin-svelte");
let babelPlugin = require("rollup-plugin-babel");

let plugins = require("../../utils/rollup-plugins");

let pkg = require("./package.json");
let deps = Object.keys(pkg.dependencies).map(key => key);

let input = "src/index.js";
let sourcemap = false;

let svelte = sveltePlugin();
let babel = babelPlugin({
  exclude: "node_modules/**"
});

module.exports = [
  {
    input,
    external: [...deps, "svelte/store"],
    plugins: [
      svelte,
      babel,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      format: "esm",
      file: "dist/curi-svelte.es.js",
      sourcemap
    }
  },

  {
    input,
    external: [...deps, "svelte/store"],
    plugins: [
      svelte,
      babel,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      format: "cjs",
      file: "dist/curi-svelte.js",
      sourcemap
    }
  }
];
