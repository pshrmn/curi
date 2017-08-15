import React from 'react';
import PropTypes from 'prop-types';

/*
 * Quick fix because the <Link> requires context.curi.
 */
class CuriProvider extends React.Component {

  getChildContext() {
    return { curi: this.props.curi };
  }

  render() {
    return this.props.children;
  }
}

CuriProvider.childContextTypes = {
  curi: PropTypes.object.isRequired
};

export default CuriProvider;
