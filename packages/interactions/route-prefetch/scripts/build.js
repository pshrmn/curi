const rollupBuild = require("../../../../scripts/build");

const name = "CuriRoutePrefetch";

// don't bundle dependencies for es/cjs builds
const pkg = require("../package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);

rollupBuild([
  [
    "ES",
    {
      name,
      format: "es",
      file: "dist/curi-route-prefetch.es.js",
      external: deps,
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "CommonJS",
    {
      name,
      format: "cjs",
      file: "dist/curi-route-prefetch.common.js",
      external: deps,
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "<script> file",
    {
      name,
      format: "iife",
      file: "dist/curi-route-prefetch.js"
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "<script> min file",
    {
      name,
      format: "iife",
      file: "dist/curi-route-prefetch.min.js",
      uglify: true
    },
    { NODE_ENV: "production", BABEL_ENV: "build" }
  ]
]);
