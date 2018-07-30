const rollupBuild = require("../../../../scripts/build");
const typescript = require("rollup-plugin-typescript2");

// don't bundle dependencies for es/cjs builds
const pkg = require("../package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);

const base = {
  name: "CuriSideEffectTitle",
  input: "src/index.ts",
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    })
  ]
};

rollupBuild([
  [
    "ES",
    {
      ...base,
      format: "es",
      file: "dist/curi-side-effect-title.es.js",
      external: deps,
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "CommonJS",
    {
      ...base,
      format: "cjs",
      file: "dist/curi-side-effect-title.common.js",
      external: deps,
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "<script> file",
    {
      ...base,
      format: "iife",
      file: "dist/curi-side-effect-title.js"
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "<script> min file",
    {
      ...base,
      format: "iife",
      file: "dist/curi-side-effect-title.min.js",
      uglify: true
    },
    { NODE_ENV: "production", BABEL_ENV: "build" }
  ]
]);