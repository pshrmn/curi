let plugins = require("../../utils/rollup-plugins");

let pkg = require("./package.json");
let deps = Object.keys(pkg.dependencies).map(key => key);

let input = "src/index.ts";
let sourcemap = false;
let globals = {
  react: "React"
};

module.exports = [
  {
    input,
    external: [...deps, "react", "react-native"],
    plugins: [
      plugins.typescript,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      format: "esm",
      file: "dist/curi-react-native.es.js",
      globals,
      sourcemap
    }
  },

  {
    input,
    external: [...deps, "react", "react-native"],
    plugins: [
      plugins.typescript,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      format: "cjs",
      file: "dist/curi-react-native.js",
      globals,
      sourcemap
    }
  }
];
