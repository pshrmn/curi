const rollupBuild = require("../../../scripts/build");
const typescript = require("rollup-plugin-typescript2");

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
    "ES",
    {
      ...base,
      format: "es",
      file: "dist/curi-react-native.es.js",
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "CommonJS",
    {
      ...base,
      format: "cjs",
      file: "dist/curi-react-native.common.js",
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ]
]);
