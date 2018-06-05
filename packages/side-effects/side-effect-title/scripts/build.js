const rollupBuild = require("../../../../scripts/build");
const typescript = require("rollup-plugin-typescript2");

const name = "CuriSideEffectTitle";

// don't bundle dependencies for es/cjs builds
const pkg = require("../package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);

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
      file: "dist/curi-side-effect-title.es.js",
      external: deps,
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
      file: "dist/curi-side-effect-title.common.js",
      external: deps,
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
      file: "dist/curi-side-effect-title.js",
      plugins
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "<script> min file",
    {
      name,
      format: "iife",
      file: "dist/curi-side-effect-title.min.js",
      plugins,
      uglify: true
    },
    { NODE_ENV: "production", BABEL_ENV: "build" }
  ]
]);
