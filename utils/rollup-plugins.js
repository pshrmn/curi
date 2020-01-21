let { uglify } = require("rollup-plugin-uglify");
let replace = require("rollup-plugin-replace");
let commonjs = require("rollup-plugin-commonjs");
let resolve = require("rollup-plugin-node-resolve");
let { sizeSnapshot } = require("rollup-plugin-size-snapshot");
let typescript = require("rollup-plugin-typescript2");

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
