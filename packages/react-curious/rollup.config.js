import config from '../../config/rollup.config.js';

export default Object.assign({}, config, {
  moduleName: 'CuriReactCurious',
  external: [
    'react',
    'prop-types'
  ],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes'
  }
});
