const rollupBuild = require("../../../scripts/build");
const copyHTML = require("./copyHTML");
const sveltePlugin = require("rollup-plugin-svelte");
const babelPlugin = require("rollup-plugin-babel");

// don't bundle dependencies for es/cjs builds
const pkg = require("../package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);
const external = [...deps, "svelte/store"];

const base = {
  name: "CuriSvelte",
  input: "src/index.js",
  plugins: [
    sveltePlugin({
      include: "src/**/*.html"
    }),
    babelPlugin({
      exclude: "node_modules/**"
    })
  ]
};

rollupBuild([
  [
    "ES",
    {
      ...base,
      format: "es",
      file: "dist/curi-svelte.es.js",
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],
  [
    "CommonJS",
    {
      ...base,
      format: "cjs",
      file: "dist/curi-svelte.common.js",
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ]
]);

copyHTML();
