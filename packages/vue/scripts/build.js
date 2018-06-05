const rollupBuild = require("../../../scripts/build");
const typescript = require("rollup-plugin-typescript2");

const name = "CuriVue";

// don't bundle dependencies for es/cjs builds
const pkg = require("../package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);
const external = [...deps, "vue"];
const globals = {
  vue: "Vue"
};

const plugins = [
  typescript({
    useTsconfigDeclarationDir: true
  })
];

rollupBuild([
  [
    "ES",
    {
      name,
      format: "es",
      file: "dist/curi-vue.es.js",
      external,
      plugins,
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
      plugins,
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
      globals,
      plugins
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
      plugins,
      uglify: true
    },
    { NODE_ENV: "production", BABEL_ENV: "build" }
  ]
]);
