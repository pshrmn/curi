const plugins = require("../../../utils/rollup-plugins");

// don't bundle dependencies for es/cjs builds
const pkg = require("./package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);

const input = "src/index.ts";
const sourcemap = false;

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
      file: "dist/curi-side-effect-title.es.js",
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
      file: "dist/curi-side-effect-title.js",
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
      name: "CuriSideEffectTitle",
      format: "umd",
      file: "dist/curi-side-effect-title.umd.js",
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
      name: "CuriSideEffectTitle",
      format: "umd",
      file: "dist/curi-side-effect-title.min.js",
      sourcemap
    }
  }
];
