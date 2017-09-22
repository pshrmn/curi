const rollupBuild = require('../../../../scripts/build');

rollupBuild(
  'ES',
  { f: 'es', o: 'dist/curi-addon-active.es.js' },
  { NODE_ENV: 'development' }
);

rollupBuild(
  'CommonJS',
  { f: 'cjs', o: 'dist/curi-addon-active.common.js' },
  { NODE_ENV: 'development' }
);

rollupBuild(
  '<script> file',
  { f: 'iife', o: 'dist/curi-addon-active.js' },
  { NODE_ENV: 'development' }
);

rollupBuild(
  '<script> min file',
  { f: 'iife', o: 'dist/curi-addon-active.min.js' },
  { NODE_ENV: 'production' }
);
