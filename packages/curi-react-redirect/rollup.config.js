import config from '../../rollup.config.js';

export default Object.assign({}, config, {
  moduleName: 'CuriReactRedirect',
  external: [
    'react',
    'prop-types'
  ],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes'
  }
});
