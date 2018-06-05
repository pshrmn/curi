const rollupBuild = require("../../../scripts/build");
const typescript = require("rollup-plugin-typescript2");

// don't bundle dependencies for es/cjs builds
const pkg = require("../package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);

const base = {
  name: "CuriVue",
  input: "src/index.ts",
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    })
  ],
  globals: {
    vue: "Vue"
  }
};
rollupBuild([
  [
    "ES",
    {
      ...base,
      format: "es",
      file: "dist/curi-vue.es.js",
      external: [...deps, "vue"],
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "CommonJS",
    {
      ...base,
      format: "cjs",
      file: "dist/curi-vue.common.js",
      external: [...deps, "vue"],
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "<script> file",
    {
      ...base,
      format: "iife",
      file: "dist/curi-vue.js",
      external: ["vue"]
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "<script> min file",
    {
      ...base,
      format: "iife",
      file: "dist/curi-vue.min.js",
      external: ["vue"],
      uglify: true
    },
    { NODE_ENV: "production", BABEL_ENV: "build" }
  ]
]);
