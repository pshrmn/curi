const svelte = require("svelte");

exports.process = function process(src) {
  const result = svelte.compile(src, {
    format: "cjs"
  });
  return result.js.code;
};
