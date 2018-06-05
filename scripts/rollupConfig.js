const typescript = require("rollup-plugin-typescript2");
const uglifyPlugin = require("rollup-plugin-uglify");
const replace = require("rollup-plugin-replace");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");

module.exports = function(options = {}) {
  const {
    name,
    file,
    input = "src/index.ts",
    external = [],
    globals = {},
    format = "cjs",
    plugins: userPlugins = [],
    sourcemap = false,
    safeModules = true,
    uglify = false,
    typescript: useTypescript = true
  } = options;

  const replacePatterns = {
    // Typescript -> Uglify
    "@class": "#__PURE__"
  };
  if (safeModules) {
    replacePatterns["process.env.NODE_ENV"] = JSON.stringify(
      process.env.NODE_ENV
    );
  }

  const plugins = [
    ...userPlugins,
    replace(replacePatterns),
    resolve(),
    commonjs({
      include: /node_modules/
    })
  ];
  if (useTypescript) {
    plugins.push(
      typescript({
        useTsconfigDeclarationDir: true
      })
    );
  }
  if (uglify) {
    plugins.push(uglifyPlugin());
  }

  return {
    inputOptions: {
      input,
      external,
      plugins
    },
    outputOptions: {
      name,
      format,
      file,
      sourcemap,
      globals
    }
  };
};
