const rollup = require("rollup");
const buildConfig = require("./rollupConfig");

const buildStats = {};

async function rollupBuild(name, config, extraEnv) {
  Object.keys(extraEnv).forEach(key => {
    process.env[key] = extraEnv[key];
  });
  const { inputOptions, outputOptions } = buildConfig(config, extraEnv);
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
}

async function buildAll(configs) {
  for (let i = 0; i < configs.length; i++) {
    await rollupBuild(...configs[i]);
  }
}

module.exports = buildAll;
