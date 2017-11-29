import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const config = {
  input: 'src/index.js',
  name: 'CuriSvelte',
  sourcemap: true,
  plugins: [
    svelte({
      include: 'src/**/*.html',
      store: true
    }),
    babel({
      exclude: 'node_modules/**'
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