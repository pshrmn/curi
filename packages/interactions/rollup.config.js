let plugins = require("../../utils/rollup-plugins");

// don't bundle dependencies for esm/cjs builds
let pkg = require("./package.json");
let deps = Object.keys(pkg.dependencies).map(key => key);

let input = "src/index.ts";
let sourcemap = false;

module.exports = [
  {
    input,
    external: deps,
    plugins: [
      plugins.typescript,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      format: "esm",
      file: "dist/curi-interactions.es.js",
      sourcemap
    }
  },

  {
    input,
    external: deps,
    plugins: [
      plugins.typescript,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      format: "cjs",
      file: "dist/curi-interactions.js",
      sourcemap
    }
  },

  {
    input,
    plugins: [
      plugins.typescript,
      plugins.replaceWithDevelopment,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      name: "CuriInteractions",
      format: "umd",
      file: "dist/curi-interactions.umd.js",
      sourcemap
    }
  },

  {
    input,
    plugins: [
      plugins.typescript,
      plugins.replaceWithProduction,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot,
      plugins.minify
    ],
    output: {
      name: "CuriInteractions",
      format: "umd",
      file: "dist/curi-interactions.min.js",
      sourcemap
    }
  }
];
