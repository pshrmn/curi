const uglifyPlugin = require("rollup-plugin-uglify");
const replace = require("rollup-plugin-replace");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");

module.exports = function(options, env) {
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

  const plugins = [
    ...userPlugins,
    // Typescript -> Uglify
    replace({
      values: {
        "@class": "#__PURE__"
      },
      delimiters: ["", ""]
    }),
    resolve(),
    commonjs({
      include: /node_modules/
    })
  ];

  if (safeModules) {
    plugins.push(
      replace({
        "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
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
