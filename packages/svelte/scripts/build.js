const rollupBuild = require("../../../scripts/build");
const copyHTML = require("./copyHTML");
const sveltePlugin = require("rollup-plugin-svelte");

const name = "CuriSvelte";

// don't bundle dependencies for es/cjs builds
const pkg = require("../package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);
const external = [...deps, "svelte/store"];

const plugins = [
  sveltePlugin({
    include: "src/**/*.html"
  })
];

rollupBuild([
  [
    "ES",
    {
      name,
      format: "es",
      input: "src/index.js",
      file: "dist/curi-svelte.es.js",
      plugins,
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
      input: "src/index.js",
      file: "dist/curi-svelte.common.js",
      plugins,
      external,
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ]
]);

copyHTML();
