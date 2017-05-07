import React from 'react';
import PropTypes from 'prop-types';

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
    onClick: PropTypes.func
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
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.createPathname(nextProps, nextContext);
  }

  render() {
    const { to, params, details, onClick, ...rest } = this.props;
    const { curi } = this.context;
    const { pathname } = this.state;
    const href = curi.history.createHref({ pathname, ...details });
    return <a onClick={this.clickHandler} href={href} {...rest} />;
  }
}

export default Link;
