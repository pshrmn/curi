let { compile } = require("svelte/compiler");

let dev = process.env.TEST_ENV !== "cjs";

exports.process = function process(src) {
  let result = compile(src, {
    format: "cjs",
    dev
  });
  return result.js.code;
};
