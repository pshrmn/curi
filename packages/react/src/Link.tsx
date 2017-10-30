import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { CuriContext } from './interface';
import { CuriConfig, Response } from '@curi/core';

const canNavigate = (event: React.MouseEvent<HTMLElement>) => {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
};

export interface ActiveLink {
  merge: (props: object) => object;
  partial?: boolean;
}

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  params?: object;
  details?: object;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  active?: ActiveLink;
  anchor?: React.ComponentClass | React.StatelessComponent;
  target?: string;
  curi?: CuriConfig;
  response?: Response;
}

export interface LinkState {
  pathname: string;
}

class Link extends React.Component<LinkProps, LinkState> {
  static contextTypes = {
    curi: PropTypes.object,
    curiResponse: PropTypes.object
  };

  clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (canNavigate(event) && !this.props.target) {
      event.preventDefault();
      const curi = this.props.curi || this.context.curi;
      const { pathname } = this.state;
      const { to, params, details = {} } = this.props;
      const location = { pathname, ...details };
      curi.history.navigate(location);
    }
  };

  createPathname(props: LinkProps, context: CuriContext) {
    const { to, params } = props;
    const curi = props.curi || context.curi;
    const response = props.response || context.curiResponse;
    const pathname =
      to != null
        ? curi.addons.pathname(to, params)
        : response.location.pathname;
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

  componentWillReceiveProps(nextProps: LinkProps, nextContext: CuriContext) {
    this.createPathname(nextProps, nextContext);
    if (nextProps.active) {
      this.verifyActiveAddon();
    }
  }

  verifyActiveAddon() {
    const curi = this.props.curi || this.context.curi;
    invariant(
      curi.addons.active,
      'You are attempting to use the "active" prop, but have not included the "active" ' +
        'addon (curi-addon-active) in your Curi configuration object.'
    );
  }

  render(): React.ReactElement<any> {
    const {
      to,
      params,
      details,
      onClick,
      active,
      anchor,
      ...rest
    } = this.props;
    const curi = this.props.curi || this.context.curi;
    const response = this.props.response || this.context.curiResponse;
    let anchorProps = rest;
    const Anchor:
      | React.ComponentClass
      | React.StatelessComponent
      | string = anchor ? anchor : 'a';
    if (active) {
      const { partial, merge } = active;
      const isActive = curi.addons.active(to, response, params, partial);
      if (isActive) {
        anchorProps = merge(anchorProps);
      }
    }

    const { pathname } = this.state;
    const href: string = curi.history.toHref({ pathname, ...details });

    return <Anchor {...anchorProps} onClick={this.clickHandler} href={href} />;
  }
}

export default Link;
