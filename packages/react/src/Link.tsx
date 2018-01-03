import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { CuriContext } from './interface';
import { CuriRouter, Response } from '@curi/core';
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
  router?: CuriRouter;
  response?: Response;
}

export interface LinkState {
  pathname: string;
}

class Link extends React.Component<LinkProps, LinkState> {
  static contextTypes = {
    curi: PropTypes.shape({
      router: PropTypes.object,
      response: PropTypes.object
    })
  };

  clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (canNavigate(event) && !this.props.target) {
      event.preventDefault();
      const router = this.props.router || this.context.curi.router;
      const { pathname } = this.state;
      const { to, params, details = {} } = this.props;
      const location = { ...details, pathname };
      router.history.navigate(location);
    }
  };

  createPathname(props: LinkProps, context: CuriContext) {
    const { to, params } = props;
    const router = props.router || context.curi.router;
    const response = props.response || context.curi.response;
    const pathname =
      to != null
        ? router.addons.pathname(to, params)
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
    const router = this.props.router || this.context.curi.router;
    invariant(
      router.addons.active,
      'You are attempting to use the "active" prop, but have not included the "active" ' +
        'addon (@curi/addon-active) in your Curi router.'
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
    const router = this.props.router || this.context.curi.router;
    const response = this.props.response || this.context.curi.response;
    let anchorProps = rest;
    const Anchor: React.ReactType = anchor ? anchor : 'a';
    if (active) {
      const { partial, merge, extra } = active;
      const isActive =
      router.addons.active(to, response, params, partial) &&
        (extra ? extra(response.location, details) : true);
      if (isActive) {
        anchorProps = merge(anchorProps);
      }
    }

    const { pathname } = this.state;
    const href: string = router.history.toHref({ ...details, pathname });

    return <Anchor {...anchorProps} onClick={this.clickHandler} href={href} />;
  }
}

export default Link;
