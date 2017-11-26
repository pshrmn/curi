import React from 'react';
import PropTypes from 'prop-types';

/*
 * Quick fix because the <Link> requires context.curi.
 */
class CuriProvider extends React.Component {

  getChildContext() {
    return {
      curi: {
        config: this.props.config
      }
    };
  }

  render() {
    return this.props.children;
  }
}

CuriProvider.childContextTypes = {
  curi: PropTypes.shape({
    config: PropTypes.object.isRequired
  }).isRequired
};

export default CuriProvider;
