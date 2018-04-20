const rollupBuild = require("../../../../scripts/build");

rollupBuild(
  "ES",
  { f: "es", o: "dist/curi-route-ancestors.es.js" },
  { NODE_ENV: "development", BABEL_ENV: "build" }
);

rollupBuild(
  "CommonJS",
  { f: "cjs", o: "dist/curi-route-ancestors.common.js" },
  { NODE_ENV: "development", BABEL_ENV: "build" }
);

rollupBuild(
  "<script> file",
  { f: "iife", o: "dist/curi-route-ancestors.js" },
  { NODE_ENV: "development", BABEL_ENV: "build" }
);

rollupBuild(
  "<script> min file",
  { f: "iife", o: "dist/curi-route-ancestors.min.js" },
  { NODE_ENV: "production", BABEL_ENV: "build" }
);
