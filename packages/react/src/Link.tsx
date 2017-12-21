import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { CuriContext } from './interface';
import { CuriConfig, Response } from '@curi/core';
import { HickoryLocation } from '@hickory/root';

const canNavigate = (event: React.MouseEvent<HTMLElement>) => {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
};

export interface ActiveLink {
  merge(props: object): object;
  partial?: boolean;
  extra?(l: HickoryLocation, d: object): boolean;
}

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  params?: object;
  details?: object;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  active?: ActiveLink;
  anchor?: React.ReactType;
  target?: string;
  curi?: CuriConfig;
  response?: Response;
}

export interface LinkState {
  pathname: string;
}

class Link extends React.Component<LinkProps, LinkState> {
  static contextTypes = {
    curi: PropTypes.shape({
      config: PropTypes.object,
      response: PropTypes.object
    })
  };

  clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (canNavigate(event) && !this.props.target) {
      event.preventDefault();
      const curi = this.props.curi || this.context.curi.config;
      const { pathname } = this.state;
      const { to, params, details = {} } = this.props;
      const location = { ...details, pathname };
      curi.history.navigate(location);
    }
  };

  createPathname(props: LinkProps, context: CuriContext) {
    const { to, params } = props;
    const curi = props.curi || context.curi.config;
    const response = props.response || context.curi.response;
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
    const curi = this.props.curi || this.context.curi.config;
    invariant(
      curi.addons.active,
      'You are attempting to use the "active" prop, but have not included the "active" ' +
        'addon (@curi/addon-active) in your Curi configuration object.'
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
    const curi = this.props.curi || this.context.curi.config;
    const response = this.props.response || this.context.curi.response;
    let anchorProps = rest;
    const Anchor: React.ReactType = anchor ? anchor : 'a';
    if (active) {
      const { partial, merge, extra } = active;
      const isActive =
        curi.addons.active(to, response, params, partial) &&
        (extra ? extra(response.location, details) : true);
      if (isActive) {
        anchorProps = merge(anchorProps);
      }
    }

    const { pathname } = this.state;
    const href: string = curi.history.toHref({ ...details, pathname });

    return <Anchor {...anchorProps} onClick={this.clickHandler} href={href} />;
  }
}

export default Link;
