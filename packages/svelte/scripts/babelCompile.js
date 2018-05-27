// creating a custom transformer so that node_modules/svelte/store.js
// is properly transformed
const babelOptions = require("../.babelrc");

module.exports = require("babel-jest").createTransformer(babelOptions);
