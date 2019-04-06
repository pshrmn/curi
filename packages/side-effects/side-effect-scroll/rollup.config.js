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
      plugins.replacePure,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      format: "esm",
      file: "dist/curi-side-effect-scroll.es.js",
      sourcemap
    }
  },

  {
    input,
    external: deps,
    plugins: [
      plugins.typescript,
      plugins.replacePure,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      format: "cjs",
      file: "dist/curi-side-effect-scroll.js",
      sourcemap
    }
  },

  {
    input,
    plugins: [
      plugins.typescript,
      plugins.replacePure,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      name: "CuriSideEffectScroll",
      format: "umd",
      file: "dist/curi-side-effect-scroll.umd.js",
      sourcemap
    }
  },

  {
    input,
    plugins: [
      plugins.typescript,
      plugins.replacePure,
      plugins.replaceWithProduction,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot,
      plugins.minify
    ],
    output: {
      name: "CuriSideEffectScroll",
      format: "umd",
      file: "dist/curi-side-effect-scroll.min.js",
      sourcemap
    }
  }
];
