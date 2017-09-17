import config from '../../config/rollup.config.js';
import svelte from 'rollup-plugin-svelte';

export default Object.assign({}, config, {
  name: 'CuriSvelte',
  plugins: [
    svelte({
      include: 'src/**/*.html'
    }),
    ...config.plugins
  ]
});
