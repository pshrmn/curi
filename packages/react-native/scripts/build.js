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
  name: "CuriReactNative",
  input: "src/index.ts",
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    })
  ],
  external: [...deps, "react", "react-native"]
};

const plugins = [
  typescript({
    useTsconfigDeclarationDir: true
  })
];

rollupBuild([
  [
    "ESM",
    {
      ...base,
      format: "esm",
      file: "dist/curi-react-native.es.js",
      replaceNodeEnv: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "CommonJS",
    {
      ...base,
      format: "cjs",
      file: "dist/curi-react-native.js",
      replaceNodeEnv: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ]
]);
