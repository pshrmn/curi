const uglifyPlugin = require("rollup-plugin-uglify");
const replace = require("rollup-plugin-replace");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const { sizeSnapshot } = require("rollup-plugin-size-snapshot");
const typescript = require("rollup-plugin-typescript2");

exports.replacePure = replace({
  values: {
    "@class": "#__PURE__"
  },
  delimiters: ["", ""]
});
exports.replaceWithProduction = replace({
  "process.env.NODE_ENV": "production"
});

exports.resolveNode = resolve();

exports.commonjs = commonjs({
  include: /node_modules/
});

exports.sizeSnapshot = sizeSnapshot();

exports.minify = uglifyPlugin();

exports.typescript = typescript({
  useTsconfigDeclarationDir: true
});
