const plugins = require("../../utils/rollup-plugins");

const pkg = require("./package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);

const input = "src/index.ts";
const sourcemap = false;
const globals = {
  react: "React"
};

module.exports = [
  {
    input,
    external: [...deps, "react", "react-native"],
    plugins: [
      plugins.typescript,
      plugins.replacePure,
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
      plugins.replacePure,
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
