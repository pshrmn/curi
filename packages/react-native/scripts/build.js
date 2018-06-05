const rollupBuild = require("../../../scripts/build");

const name = "CuriReactNative";

// don't bundle dependencies for es/cjs builds
const pkg = require("../package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);

const external = [...deps, "react", "react-native"];
const globals = {
  react: "React",
  "react-native": "ReactNative"
};

rollupBuild([
  [
    "ES",
    {
      name,
      format: "es",
      file: "dist/curi-react-native.es.js",
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
      file: "dist/curi-react-native.common.js",
      external,
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ]
]);
