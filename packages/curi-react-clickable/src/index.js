import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant'

class Clickable extends React.Component {
  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]).isRequired,
    to: PropTypes.string,
    params: PropTypes.object,
    details: PropTypes.object,
    onClick: PropTypes.func,
    active: PropTypes.shape({
      merge: PropTypes.func.isRequired,
      partial: PropTypes.bool
    })
  };

  static contextTypes = {
    curi: PropTypes.object.isRequired,
    curiResponse: PropTypes.object
  };

  clickHandler = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }

    const { curi } = this.context;
    const { to, params, details = {} } = this.props;
    const pathname = to != null ? curi.addons.pathname(to, params) : '/';
    const location = { pathname, ...details };
    curi.history.push(location);
  };

  componentWillMount() {
    invariant(
      this.context.curi,
      'You are attempting to render a <Clickable> without access to a Curi config. ' +
        'Please ensure that your component has access to a Curi config through its ' +
        'context (this is most easily done by using a <Navigator>)'
    );
    if (this.props.active) {
      this.verifyActiveAddon();
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.active) {
      this.verifyActiveAddon();
    }
  }

  verifyActiveAddon() {
    invariant(
      this.context.curi.addons.active,
      'You are attempting to use the "active" prop, but have not included the "active" ' +
        'addon (curi-addon-active) in your Curi configuration object.'
    );
  }

  render() {
    const { component:Component, to, params, details, onClick, active, ...rest } = this.props;
    const { curi, curiResponse } = this.context;
    let props = rest;
    if (active) {
      const { partial, merge } = active;
      const isActive = curi.addons.active(to, curiResponse, params, partial);
      if (isActive) {
        props = merge(props);
      }
    }

    return <Component onClick={this.clickHandler} {...props} />;
  }
}

export default Clickable;
