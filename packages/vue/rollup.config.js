import config from '../../config/rollup.config.js';

export default Object.assign({}, config, {
  name: 'CuriVue',
  external: [
    'vue'
  ],
  globals: {
    vue: 'Vue'
  }
});
