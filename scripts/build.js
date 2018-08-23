const fs = require("fs");
const prettyBytes = require("pretty-bytes");
const gzipSize = require("gzip-size");
const rollup = require("rollup");
const buildConfig = require("./rollupConfig");

const buildStats = {};

async function rollupBuild(name, config, extraEnv) {
  Object.keys(extraEnv).forEach(key => {
    process.env[key] = extraEnv[key];
  });

  const { inputOptions, outputOptions } = buildConfig(config, extraEnv);

  const buildStartTime = new Date();
  console.log("\nBuilding", name);

  const bundle = await rollup.rollup(inputOptions);
  const { code, map } = await bundle.generate(outputOptions);
  await bundle.write(outputOptions);

  const buildEndTime = new Date();

  // log some stats. This isn't pretty, but it is useful
  const totalTime = buildEndTime - buildStartTime;
  console.log("Total: %d seconds", totalTime / 1000);

  if (outputOptions.file) {
    const filename = outputOptions.file;
    const size = fs.statSync(filename).size;
    const minSize = gzipSize.sync(fs.readFileSync(filename));
    console.log("%s/%s", prettyBytes(size), prettyBytes(minSize));
  }
}

async function buildAll(configs) {
  for (let i = 0; i < configs.length; i++) {
    await rollupBuild(...configs[i]);
  }
}

module.exports = buildAll;
