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
    external: [...deps, "react"],
    plugins: [
      plugins.typescript,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      format: "esm",
      file: "dist/curi-react-universal.es.js",
      globals,
      sourcemap
    }
  },

  {
    input,
    external: [...deps, "react"],
    plugins: [
      plugins.typescript,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      format: "cjs",
      file: "dist/curi-react-universal.js",
      globals,
      sourcemap
    }
  },

  {
    input,
    external: ["react"],
    plugins: [
      plugins.typescript,
      plugins.replaceWithDevelopment,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      name: "CuriReactUniversal",
      format: "umd",
      file: "dist/curi-react-universal.umd.js",
      globals,
      sourcemap
    }
  },

  {
    input,
    external: ["react"],
    plugins: [
      plugins.typescript,
      plugins.replaceWithProduction,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot,
      plugins.minify
    ],
    output: {
      name: "CuriReactUniversal",
      format: "umd",
      file: "dist/curi-react-universal.min.js",
      globals,
      sourcemap
    }
  }
];
