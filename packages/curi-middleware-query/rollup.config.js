import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const config = {
  entry: 'src/index.js',
  format: 'umd',
  dest: 'umd/curi-middleware-query.js',
  moduleName: 'CuriMiddlewareQuery',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify())
}

export default config;
