import React from 'react';
import PropTypes from 'prop-types';

class Redirect extends React.Component {
  static propTypes = {
    to: PropTypes.string,
    params: PropTypes.object,
    details: PropTypes.object,
    children: PropTypes.element
  };

  static contextTypes = {
    curi: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { to, params, details } = this.props;
    let redirectTo = details;
    if (to) {
      const pathname = this.context.curi.addons.pathname(to, params);
      redirectTo = { pathname, ...details };
    }
    this.context.curi.history.replace(redirectTo);
  }

  render() {
    return this.props.children ? this.props.children : null;
  }
}

export default Redirect;
