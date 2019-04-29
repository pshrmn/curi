const { uglify } = require("rollup-plugin-uglify");
const replace = require("rollup-plugin-replace");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const { sizeSnapshot } = require("rollup-plugin-size-snapshot");
const typescript = require("rollup-plugin-typescript2");

exports.replaceWithProduction = replace({
  "process.env.NODE_ENV": `"production"`
});
exports.replaceWithDevelopment = replace({
  "process.env.NODE_ENV": `"development"`
});

exports.resolveNode = resolve();

exports.commonjs = commonjs({
  include: /node_modules/
});

exports.sizeSnapshot = sizeSnapshot();

exports.minify = uglify();

exports.typescript = typescript({
  useTsconfigDeclarationDir: true
});
