let plugins = require("../../utils/rollup-plugins");

let pkg = require("./package.json");
let deps = Object.keys(pkg.dependencies).map(key => key);

let input = "src/index.ts";
let sourcemap = false;
let globals = {
  vue: "Vue"
};

module.exports = [
  {
    input,
    external: [...deps, "vue"],
    plugins: [
      plugins.typescript,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      format: "esm",
      file: "dist/curi-vue.es.js",
      globals,
      sourcemap
    }
  },

  {
    input,
    external: [...deps, "vue"],
    plugins: [
      plugins.typescript,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      format: "cjs",
      file: "dist/curi-vue.js",
      globals,
      sourcemap
    }
  },

  {
    input,
    external: ["vue"],
    plugins: [
      plugins.typescript,
      plugins.replaceWithDevelopment,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      name: "CuriVue",
      format: "umd",
      file: "dist/curi-vue.umd.js",
      globals,
      sourcemap
    }
  },

  {
    input,
    external: ["vue"],
    plugins: [
      plugins.typescript,
      plugins.replaceWithProduction,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot,
      plugins.minify
    ],
    output: {
      name: "CuriVue",
      format: "umd",
      file: "dist/curi-vue.min.js",
      globals,
      sourcemap
    }
  }
];
