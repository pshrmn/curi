const rollupBuild = require("../../../scripts/build");
const typescript = require("rollup-plugin-typescript2");

const name = "CuriReactNative";

// don't bundle dependencies for es/cjs builds
const pkg = require("../package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);

const external = [...deps, "react", "react-native"];
const globals = {
  react: "React",
  "react-native": "ReactNative"
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
      name,
      format: "es",
      file: "dist/curi-react-native.es.js",
      external,
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
      file: "dist/curi-react-native.common.js",
      external,
      plugins,
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ]
]);
