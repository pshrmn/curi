const rollupBuild = require("../../../../scripts/build");

rollupBuild(
  "ES",
  { f: "es", o: "dist/curi-route-active.es.js" },
  { NODE_ENV: "development" }
);

rollupBuild(
  "CommonJS",
  { f: "cjs", o: "dist/curi-route-active.common.js" },
  { NODE_ENV: "development" }
);

rollupBuild(
  "<script> file",
  { f: "iife", o: "dist/curi-route-active.js" },
  { NODE_ENV: "development" }
);

rollupBuild(
  "<script> min file",
  { f: "iife", o: "dist/curi-route-active.min.js" },
  { NODE_ENV: "production" }
);
