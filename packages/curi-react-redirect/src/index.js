import React from 'react';
import PropTypes from 'prop-types';

class Redirect extends React.Component {
  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    name: PropTypes.string,
    params: PropTypes.object,
    children: PropTypes.element
  };

  static contextTypes = {
    curi: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { name, params, to } = this.props;
    let redirectTo = to;
    if (name) {
      const pathname = this.context.curi.addons.pathname(name, params);
      redirectTo = { pathname, ...to };
    }
    this.context.curi.history.replace(redirectTo);
  }

  render() {
    return this.props.children ? this.props.children : null;
  }
}

export default Redirect;
