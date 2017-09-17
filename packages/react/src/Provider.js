import React from 'react';
import PropTypes from 'prop-types';

export default class CuriProvider extends React.Component {
  static propTypes = {
    curi: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };

  static childContextTypes = {
    curi: PropTypes.object
  };

  getChildContext() {
    return {
      curi: this.props.curi
    };
  }

  render() {
    return this.props.children;
  }
}
