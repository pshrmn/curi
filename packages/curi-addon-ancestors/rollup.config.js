import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const config = {
  entry: 'src/index.js',
  moduleName: 'CuriAddonAncestors',
  sourceMap: true,
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify());
}

export default config;