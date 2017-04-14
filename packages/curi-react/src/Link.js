import React, { Component } from 'react';
import PropTypes from 'prop-types';

const canNavigate = (event) => {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  ) 
}

class Link extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    params: PropTypes.object,
    to: PropTypes.object
  }

  static contextTypes = {
    curi: PropTypes.object.isRequired
  }

  clickHandler = (event) => {
    if (canNavigate(event) && !this.props.target) {
      event.preventDefault();
      const { curi } = this.context;
      const { pathname } = this.state;
      const { to = {} } = this.props;
      curi.history.push({ pathname, ...to })
    }
  }

  createPathname(props, context) {
    const { name, params } = props;
    const { curi } = context;
    const pathname = curi.addons.pathname(name, params);
    this.setState(() => ({
      pathname
    }));
  }

  componentWillMount() {
    this.createPathname(this.props, this.context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.createPathname(nextProps, nextContext);
  }

  render() {
    const { name, params, to, ...rest } = this.props;
    const { curi } = this.context;
    const { pathname } = this.state;
    const href = curi.history.createHref({ pathname, ...to });
    return (
      <a onClick={this.clickHandler} href={href} {...rest} />
    );
  }
}

export default Link;
