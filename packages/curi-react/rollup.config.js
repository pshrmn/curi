import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';

const r = /test/

const config = {
  entry: 'src/index.js',
  format: 'umd',
  dest: 'umd/curi-react.js',
  moduleName: 'CuriReact',
  external: [
    'react',
    'prop-types'
  ],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs({
      include: /node_modules/
    }),
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    uglify(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  )
} else {
  config.plugins.push(
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  )
}

export default config;
