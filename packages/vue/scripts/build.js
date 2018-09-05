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
    "ESM",
    {
      ...base,
      format: "esm",
      file: "dist/curi-vue.mjs",
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
      file: "dist/curi-vue.js",
      external: [...deps, "vue"],
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "UMD",
    {
      ...base,
      format: "umd",
      file: "dist/curi-vue.umd.js",
      external: ["vue"]
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "minimized UMD",
    {
      ...base,
      format: "umd",
      file: "dist/curi-vue.min.js",
      external: ["vue"],
      uglify: true
    },
    { NODE_ENV: "production", BABEL_ENV: "build" }
  ]
]);
