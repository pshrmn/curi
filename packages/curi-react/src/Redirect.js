import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Redirect extends Component {

  static propTypes = {
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    name: PropTypes.string,
    params: PropTypes.object
  }

  static contextTypes = {
    curi: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { name, params, to } = this.props;
    let redirectTo = to;
    if (name) {
      const pathname = this.context.curi.addons.pathname(name, params);
      redirectTo = { pathname, ...to };
    }
    this.context.curi.history.replace(redirectTo)
  }

  render() {
    return null;
  }
}

export default Redirect;
