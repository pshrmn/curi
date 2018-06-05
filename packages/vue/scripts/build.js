const rollupBuild = require("../../../scripts/build");

const name = "CuriVue";

// don't bundle dependencies for es/cjs builds
const pkg = require("../package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);
const external = [...deps, "vue"];
const globals = {
  vue: "Vue"
};

rollupBuild([
  [
    "ES",
    {
      name,
      format: "es",
      file: "dist/curi-vue.es.js",
      external,
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "CommonJS",
    {
      name,
      format: "cjs",
      file: "dist/curi-vue.common.js",
      external,
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "<script> file",
    {
      name,
      format: "iife",
      file: "dist/curi-vue.js",
      external,
      globals
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "<script> min file",
    {
      name,
      format: "iife",
      file: "dist/curi-vue.min.js",
      external,
      globals,
      uglify: true
    },
    { NODE_ENV: "production", BABEL_ENV: "build" }
  ]
]);
