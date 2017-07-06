const rollupBuild = require('../../../scripts/build');

// don't bundle dependencies for es/cjs builds
const pkg = require('../package.json')
const deps = Object.keys(pkg.dependencies).map(key => key);
const depsString = deps.join(',');

rollupBuild(
  'ES',
  { f: 'es', o: 'dist/curi-react-link.es.js', e: depsString },
  { NODE_ENV: 'development', BABEL_ENV: 'build' }
);

rollupBuild(
  'CommonJS',
  { f: 'cjs', o: 'dist/curi-react-link.common.js', e: depsString },
  { NODE_ENV: 'development', BABEL_ENV: 'build' }
);

rollupBuild(
  '<script> file',
  { f: 'iife', o: 'dist/curi-react-link.js' },
  { NODE_ENV: 'development', BABEL_ENV: 'build' }
);

rollupBuild(
  '<script> min file',
  { f: 'iife', o: 'dist/curi-react-link.min.js' },
  { NODE_ENV: 'production', BABEL_ENV: 'build' }
);
