import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const config = {
  entry: 'src/index.js',
  format: 'umd',
  dest: 'umd/curi-addon-ancestors.js',
  moduleName: 'CuriAddonAncestors',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify())
}

export default config;
