const svelte = require('svelte');
const babel = require('babel-jest');

module.exports = {
  process(src, path, ...rest) {
    console.log('.....');
    console.log("PATH", path);
    console.log("SOURCE", src);
    if (path.endsWith('.html')) {
      const compiled = svelte.compile(src);
      console.log("CODE\n", compiled.code);
      return babel(compiled.code, path, ...rest);
    }
    return src;
  },
};