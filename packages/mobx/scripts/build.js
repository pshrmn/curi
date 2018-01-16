const rollupBuild = require("../../../scripts/build");

// don't bundle dependencies for es/cjs builds
/*const pkg = require('../package.json')
const deps = Object.keys(pkg.dependencies).map(key => key);
const depsString = deps.join(',');*/

rollupBuild(
  "ES",
  { f: "es", o: "dist/curi-mobx.es.js" }, //, e: depsString },
  { NODE_ENV: "development", BABEL_ENV: "build" }
);

rollupBuild(
  "CommonJS",
  { f: "cjs", o: "dist/curi-mobx.common.js" }, //, e: depsString },
  { NODE_ENV: "development", BABEL_ENV: "build" }
);

rollupBuild(
  "<script> file",
  { f: "iife", o: "dist/curi-mobx.js" },
  { NODE_ENV: "development", BABEL_ENV: "build" }
);

rollupBuild(
  "<script> min file",
  { f: "iife", o: "dist/curi-mobx.min.js" },
  { NODE_ENV: "production", BABEL_ENV: "build" }
);
