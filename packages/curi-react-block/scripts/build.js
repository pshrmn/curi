const fs = require('fs');
const execSync = require('child_process').execSync;
const inInstall = require('in-publish').inInstall;
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');

if (inInstall()) {
  process.exit(0);
}

const build = (name, command, extraEnv) => { 
  console.log('\nBuilding', name);
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv)
  });
}

build(
  'ES modules',
  'babel ./src -d es',
  {
    BABEL_ENV: 'es'
  }
);

build(
  'CommonJS modules',
  'babel ./src -d lib',
  {
    BABEL_ENV: 'cjs'
  }
);

build(
  'UMD file',
  'rollup -c',
  {
    BABEL_ENV: 'es'
  }
);

build(
  'UMD min file',
  'rollup -c -o umd/curi-react-block.min.js',
  {
    BABEL_ENV: 'es',
    NODE_ENV: 'production'
  }
);

const size = fs.statSync('./umd/curi-react-block.js').size;
const minSize = gzipSize.sync(
  fs.readFileSync('./umd/curi-react-block.min.js')
);

console.log(
  '\nfull umd: %s\ngzipped umd min: %s',
  prettyBytes(size),
  prettyBytes(minSize)
);
