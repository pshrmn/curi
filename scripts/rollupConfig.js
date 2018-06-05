const uglifyPlugin = require("rollup-plugin-uglify");
const replace = require("rollup-plugin-replace");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");

module.exports = function(options = {}) {
  const {
    name,
    file,
    input,
    external = [],
    globals = {},
    format = "cjs",
    plugins: userPlugins = [],
    sourcemap = false,
    safeModules = true,
    uglify = false
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
