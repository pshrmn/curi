const plugins = require("../../utils/rollup-plugins");

const pkg = require("./package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);

const input = "src/index.ts";
const sourcemap = false;
const globals = {
  vue: "Vue"
};

module.exports = [
  {
    input,
    external: [...deps, "vue"],
    plugins: [
      plugins.typescript,
      plugins.replacePure,
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
      plugins.replacePure,
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
      plugins.replacePure,
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
      plugins.replacePure,
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
