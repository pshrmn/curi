const { compile } = require("svelte/compiler");

exports.process = function process(src) {
  const result = compile(src, {
    format: "cjs"
  });
  return result.js.code;
};
