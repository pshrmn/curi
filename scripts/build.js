const fs = require('fs');
const execSync = require('child_process').execSync;
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');

const buildStats = {}

function buildCommands(cmds) {
  return Object.keys(cmds)
    .map(key => {
      return `-${key} ${cmds[key]}`
    })
    .join(' ');
}

function rollup(name, commands, extraEnv) {
  const buildStartTime = new Date();
  console.log('\nBuilding', name);
  execSync(`rollup -c ${buildCommands(commands)}`, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv)
  });
  const buildEndTime = new Date();

  // log some stats. This isn't pretty, but it is useful
  const totalTime = buildEndTime - buildStartTime;
  console.log('Total: %d seconds', totalTime/1000);

  if (commands['o']) {
    const filename = commands['o'];
    const size = fs.statSync(filename).size;
    const minSize = gzipSize.sync(
      fs.readFileSync(filename)
    );
    console.log(
      '%s/%s',
      prettyBytes(size),
      prettyBytes(minSize)
    );
  }
}

module.exports = rollup;
