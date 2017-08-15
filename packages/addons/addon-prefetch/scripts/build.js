const rollupBuild = require('../../../../scripts/build');

rollupBuild(
  'ES',
  { f: 'es', o: 'dist/curi-addon-prefetch.es.js' },
  { NODE_ENV: 'development', BABEL_ENV: 'build' }
);

rollupBuild(
  'CommonJS',
  { f: 'cjs', o: 'dist/curi-addon-prefetch.common.js' },
  { NODE_ENV: 'development', BABEL_ENV: 'build' }
);

rollupBuild(
  '<script> file',
  { f: 'iife', o: 'dist/curi-addon-prefetch.js' },
  { NODE_ENV: 'development', BABEL_ENV: 'build' }
);

rollupBuild(
  '<script> min file',
  { f: 'iife', o: 'dist/curi-addon-prefetch.min.js' },
  { NODE_ENV: 'production', BABEL_ENV: 'build' }
);
