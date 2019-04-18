const plugins = require("../../utils/rollup-plugins");

// don't bundle dependencies for esm/cjs builds
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
      file: "dist/curi-router.es.js",
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
      file: "dist/curi-router.js",
      sourcemap
    }
  },

  {
    input,
    plugins: [
      plugins.typescript,
      plugins.replacePure,
      plugins.replaceWithDevelopment,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      name: "Curi",
      format: "umd",
      file: "dist/curi-router.umd.js",
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
      name: "Curi",
      format: "umd",
      file: "dist/curi-router.min.js",
      sourcemap
    }
  }
];
