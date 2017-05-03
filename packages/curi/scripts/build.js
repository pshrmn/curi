const fs = require('fs');
const execSync = require('child_process').execSync;
const inInstall = require('in-publish').inInstall;
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');

if (inInstall()) {
  process.exit(0);
}

const buildStats = {}

const build = (name, command, extraEnv) => { 
  const buildStartTime = new Date();
  console.log('\nBuilding', name);
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv)
  });
  const buildEndTime = new Date();
  buildStats[name] = buildEndTime - buildStartTime;
}

const startTime = new Date();

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
  'rollup -c -o umd/curi.min.js',
  {
    BABEL_ENV: 'es',
    NODE_ENV: 'production'
  }
);

const endTime = new Date();
const buildTime = endTime - startTime;

const size = fs.statSync('./umd/curi.js').size;
const minSize = gzipSize.sync(
  fs.readFileSync('./umd/curi.min.js')
);

console.log('Build time\n----------');
Object.keys(buildStats).forEach(key => {
  console.log('%s: %d seconds', key, buildStats[key]/1000);
});
console.log('Total: %d seconds', buildTime/1000);

console.log('\nFile Size\n---------');
console.log(
  'full umd: %s\n' + 
  'gzipped umd min: %s',
  prettyBytes(size),
  prettyBytes(minSize)
);
