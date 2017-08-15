const rollupBuild = require('../../../../scripts/build');

rollupBuild(
  'ES',
  { f: 'es', o: 'dist/curi-side-effect-scroll.es.js' },
  { NODE_ENV: 'development', BABEL_ENV: 'build' }
);

rollupBuild(
  'CommonJS',
  { f: 'cjs', o: 'dist/curi-side-effect-scroll.common.js' },
  { NODE_ENV: 'development', BABEL_ENV: 'build' }
);

rollupBuild(
  '<script> file',
  { f: 'iife', o: 'dist/curi-side-effect-scroll.js' },
  { NODE_ENV: 'development', BABEL_ENV: 'build' }
);

rollupBuild(
  '<script> min file',
  { f: 'iife', o: 'dist/curi-side-effect-scroll.min.js' },
  { NODE_ENV: 'production', BABEL_ENV: 'build' }
);
