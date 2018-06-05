const rollupBuild = require("../../../scripts/build");

const name = "CuriReact";

// don't bundle dependencies for es/cjs builds
const pkg = require("../package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);

const external = [...deps, "react"];
const globals = {
  react: "React"
};

rollupBuild([
  [
    "ES",
    {
      name,
      format: "es",
      file: "dist/curi-react.es.js",
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
      file: "dist/curi-react.common.js",
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
      file: "dist/curi-react.js",
      external
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "<script> min file",
    {
      name,
      format: "iife",
      file: "dist/curi-react.min.js",
      external,
      globals,
      uglify: true
    },
    { NODE_ENV: "production", BABEL_ENV: "build" }
  ]
]);
