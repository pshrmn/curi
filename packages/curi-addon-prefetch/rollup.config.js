import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const config = {
  entry: 'src/index.js',
  moduleName: 'CuriAddonPrefetch',
  sourceMap: true,
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    resolve(),
    commonjs({
      include: /node_modules/
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify());
}

export default config;