const rollupBuild = require("../../../scripts/build");
const copyHTML = require("./copyHTML");

rollupBuild(
  "ES",
  { f: "es", o: "dist/curi-svelte.es.js" },
  { NODE_ENV: "development", BABEL_ENV: "build" }
);

rollupBuild(
  "CommonJS",
  { f: "cjs", o: "dist/curi-svelte.common.js" },
  { NODE_ENV: "development", BABEL_ENV: "build" }
);

copyHTML();
