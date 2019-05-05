const { compile } = require("svelte/compiler");

const dev = process.env.TEST_ENV !== "cjs";

exports.process = function process(src) {
  const result = compile(src, {
    format: "cjs",
    dev
  });
  return result.js.code;
};
