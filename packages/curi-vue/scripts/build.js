const fs = require('fs');
const execSync = require('child_process').execSync;
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');

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
  'ES',
  'rollup -c -f es -o dist/curi-vue.es.js',
  {
    NODE_ENV: 'development',
    BABEL_ENV: 'build'
  }
);

build(
  'CommonJS',
  'rollup -c -f cjs -o dist/curi-vue.common.js',
  {
    NODE_ENV: 'development',
    BABEL_ENV: 'build'
  }
);

build(
  '<script> file',
  'rollup -c -f iife -o dist/curi-vue.js',
  {
    NODE_ENV: 'development',
    BABEL_ENV: 'build'
  }
);

build(
  '<script> min file',
  'rollup -c -f iife -o dist/curi-vue.min.js',
  {
    NODE_ENV: 'production',
    BABEL_ENV: 'build'
  }
);

const endTime = new Date();
const buildTime = endTime - startTime;

const size = fs.statSync('./dist/curi-vue.js').size;
const minSize = gzipSize.sync(
  fs.readFileSync('./dist/curi-vue.min.js')
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
