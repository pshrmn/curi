const rollupBuild = require('../../../scripts/build');

rollupBuild(
  'ES',
  { f: 'es', o: 'dist/curi-vue.es.js' },
  { NODE_ENV: 'development', BABEL_ENV: 'build' }
);

rollupBuild(
  'CommonJS',
  { f: 'cjs', o: 'dist/curi-vue.common.js' },
  { NODE_ENV: 'development', BABEL_ENV: 'build' }
);

rollupBuild(
  '<script> file',
  { f: 'iife', o: 'dist/curi-vue.js' },
  { NODE_ENV: 'development', BABEL_ENV: 'build' }
);

rollupBuild(
  '<script> min file',
  { f: 'iife', o: 'dist/curi-vue.min.js' },
  { NODE_ENV: 'production', BABEL_ENV: 'build' }
);
