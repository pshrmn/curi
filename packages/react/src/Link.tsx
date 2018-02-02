import React from "react";
import invariant from "invariant";

import CuriContext from "./Context";

import { CuriRouter, Response } from "@curi/core";
import {
  HickoryLocation,
  PartialLocation,
  LocationDetails
} from "@hickory/root";

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
  extra?(l: HickoryLocation, d: LocationDetails): boolean;
}

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  params?: object;
  details?: LocationDetails;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  active?: ActiveLink;
  anchor?: React.ReactType;
  target?: string;
}

export interface BaseLinkProps extends LinkProps {
  router: CuriRouter;
  response: Response;
}

export interface LinkState {
  location: PartialLocation;
}

class BaseLink extends React.Component<BaseLinkProps, LinkState> {
  clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const { onClick, router, target } = this.props;
    if (onClick) {
      onClick(event);
    }

    if (canNavigate(event) && !target) {
      event.preventDefault();
      router.history.navigate(this.state.location);
    }
  };

  setLocation(props: BaseLinkProps) {
    const { router, to, params, details } = props;
    const location = router.createLocation({
      name: to,
      params,
      ...details
    });
    this.setState({ location });
  }

  componentWillMount() {
    this.setLocation(this.props);
    if (this.props.active) {
      this.verifyActiveAddon();
    }
  }

  componentWillReceiveProps(nextProps: BaseLinkProps) {
    this.setLocation(nextProps);
    if (nextProps.active) {
      this.verifyActiveAddon();
    }
  }

  verifyActiveAddon() {
    const router = this.props.router;
    invariant(
      router.addons.active,
      'You are attempting to use the "active" prop, but have not included the "active" ' +
        "addon (@curi/addon-active) in your Curi router."
    );
  }

  render(): React.ReactNode {
    const {
      to,
      params,
      details,
      onClick,
      active,
      anchor,
      router,
      response,
      ...rest
    } = this.props;
    let anchorProps = rest;
    const Anchor: React.ReactType = anchor ? anchor : "a";
    if (active) {
      const { partial, merge, extra } = active;
      const isActive =
        router.addons.active(to, response, params, partial) &&
        (extra ? extra(response.location, details) : true);
      if (isActive) {
        anchorProps = merge(anchorProps);
      }
    }

    const { location } = this.state;
    const href: string = router.history.toHref(location);

    return <Anchor {...anchorProps} onClick={this.clickHandler} href={href} />;
  }
}

const Link = (props: LinkProps): React.ReactElement<any> => (
  <CuriContext.Consumer>
    {({ router, response }) => (
      <BaseLink {...props} router={router} response={response} />
    )}
  </CuriContext.Consumer>
);

export default Link;
