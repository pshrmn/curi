import React, { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';

const canNavigate = event => {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
};

class Link extends Component {
  static propTypes = {
    name: PropTypes.string,
    params: PropTypes.object,
    to: PropTypes.object,
    prefetch: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    prefetch: false
  };

  static contextTypes = {
    curi: PropTypes.object.isRequired
  };

  clickHandler = event => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (canNavigate(event) && !this.props.target) {
      event.preventDefault();
      const { curi } = this.context;
      const { pathname } = this.state;
      const {
        name,
        prefetch,
        params,
        to = {}
      } = this.props;
      const location = { pathname, ...to };

      if (prefetch) {
        curi.addons.prefetch(name, { params })
          .then(() => {
            curi.history.push(location);
          })
          .catch(err => {
            console.error(err);
          })
      } else {
        curi.history.push(location);
      }

    }
  };

  createPathname(props, context) {
    const { name, params } = props;
    const { curi } = context;
    const pathname = name != null ? curi.addons.pathname(name, params) : '/';
    this.setState(() => ({
      pathname
    }));
  }

  componentWillMount() {
    invariant(
      !this.props.name || (this.props.name && this.context.curi.addons.pathname),
      'You cannot use the "name" prop if your curi configuration does not include the pathname addon'
    );


    invariant(
      !this.props.prefetch || (this.props.prefetch && this.context.curi.addons.prefetch),
      'You cannot use the "prefetch" prop if your curi configuration does not include the prefetch addon'
    );

    this.createPathname(this.props, this.context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.createPathname(nextProps, nextContext);
  }

  render() {
    const { name, params, to, onClick, prefetch, ...rest } = this.props;
    const { curi } = this.context;
    const { pathname } = this.state;
    const href = curi.history.createHref({ pathname, ...to });
    return <a onClick={this.clickHandler} href={href} {...rest} />;
  }
}

export default Link;
