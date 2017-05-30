import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';

const canNavigate = event => {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
};

class Link extends React.Component {
  static propTypes = {
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

  clickHandler = event => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (canNavigate(event) && !this.props.target) {
      event.preventDefault();
      const { curi } = this.context;
      const { pathname } = this.state;
      const { to, params, details = {} } = this.props;
      const location = { pathname, ...details };
      curi.history.push(location);
    }
  };

  createPathname(props, context) {
    const { to, params } = props;
    const { curi } = context;
    const pathname = to != null ? curi.addons.pathname(to, params) : '/';
    this.setState(() => ({
      pathname
    }));
  }

  componentWillMount() {
    this.createPathname(this.props, this.context);
    if (this.props.active) {
      this.verifyActiveAddon();
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.createPathname(nextProps, nextContext);
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
    const {
      to,
      params,
      details,
      onClick,
      active,
      component:Component = 'a',
      ...rest
    } = this.props;
    const { curi, curiResponse } = this.context;
    let anchorProps = rest;
    if (active) {
      const { partial, merge } = active;
      const isActive = curi.addons.active(to, curiResponse, params, partial);
      if (isActive) {
        anchorProps = merge(anchorProps);
      }
    }
    const { pathname } = this.state;
    const href = curi.history.createHref({ pathname, ...details });
    return <Component onClick={this.clickHandler} href={href} {...anchorProps} />;
  }
}

export default Link;
