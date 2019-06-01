const sveltePlugin = require("rollup-plugin-svelte");
const babelPlugin = require("rollup-plugin-babel");

const plugins = require("../../utils/rollup-plugins");

const pkg = require("./package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);

const input = "src/index.js";
const sourcemap = false;

const svelte = sveltePlugin();
const babel = babelPlugin({
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
