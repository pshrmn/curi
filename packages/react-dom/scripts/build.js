const rimraf = require("rimraf");
const path = require("path");
const typescript = require("rollup-plugin-typescript2");

const rollupBuild = require("../../../scripts/build");

const dist = path.join(__dirname, "..", "dist");
const types = path.join(__dirname, "..", "types");
rimraf.sync(dist);
rimraf.sync(types);

// don't bundle dependencies for es/cjs builds
const pkg = require("../package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);

const base = {
  name: "CuriReactDOM",
  input: "src/index.ts",
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    })
  ],
  globals: {
    react: "React"
  }
};

rollupBuild([
  [
    "ESM",
    {
      ...base,
      format: "esm",
      file: "dist/curi-react-dom.es.js",
      external: [...deps, "react"],
      replaceNodeEnv: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "CommonJS",
    {
      ...base,
      format: "cjs",
      file: "dist/curi-react-dom.js",
      external: [...deps, "react"],
      replaceNodeEnv: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "UMD",
    {
      ...base,
      format: "umd",
      file: "dist/curi-react-dom.umd.js",
      external: ["react"]
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "minimized UMD",
    {
      ...base,
      format: "umd",
      file: "dist/curi-react-dom.min.js",
      external: ["react"],
      uglify: true
    },
    { NODE_ENV: "production", BABEL_ENV: "build" }
  ]
]);
