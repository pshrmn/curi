const rimraf = require("rimraf");
const path = require("path");
const sveltePlugin = require("rollup-plugin-svelte");
const babelPlugin = require("rollup-plugin-babel");

const rollupBuild = require("../../../scripts/build");
const copyHTML = require("./copyHTML");

const dist = path.join(__dirname, "..", "dist");
rimraf.sync(dist);

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
    "ESM",
    {
      ...base,
      format: "esm",
      file: "dist/curi-svelte.es.js",
      replaceNodeEnv: false
    },
    { NODE_ENV: "development" }
  ],
  [
    "CommonJS",
    {
      ...base,
      format: "cjs",
      file: "dist/curi-svelte.js",
      replaceNodeEnv: false
    },
    { NODE_ENV: "development" }
  ]
]);

copyHTML();
