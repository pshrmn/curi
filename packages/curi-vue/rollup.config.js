import config from '../../rollup.config.js';

export default Object.assign({}, config, {
  moduleName: 'CuriVue',
  external: [
    'vue'
  ],
  globals: {
    vue: 'Vue'
  }
});
