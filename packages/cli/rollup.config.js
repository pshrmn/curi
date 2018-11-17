const plugins = require("../../scripts/rollup/plugins");

// don't bundle dependencies for esm/cjs builds
const pkg = require("./package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);

const input = "src/index.ts";
const sourcemap = false;

module.exports = [
  {
    input,
    external: [...deps, "path"],
    plugins: [
      plugins.typescript,
      plugins.replacePure,
      plugins.replaceWithProduction,
      plugins.resolveNode,
      plugins.commonjs,
      plugins.sizeSnapshot
    ],
    output: {
      format: "cjs",
      file: "bin/curi-cli.js",
      banner: "#!/usr/bin/env node",
      sourcemap
    }
  }
];
