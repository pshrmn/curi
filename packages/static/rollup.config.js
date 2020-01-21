let plugins = require("../../utils/rollup-plugins");

// don't bundle dependencies for esm/cjs builds
let pkg = require("./package.json");
let deps = Object.keys(pkg.dependencies).map(key => key);

let input = "src/index.ts";
let sourcemap = false;

module.exports = [
  {
    input,
    external: [...deps, "path"],
    plugins: [
      plugins.typescript,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      format: "cjs",
      file: "dist/curi-static.js",
      sourcemap
    }
  }
];
