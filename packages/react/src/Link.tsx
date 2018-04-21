import React from "react";
import invariant from "invariant";

import { Curious } from "./Context";

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

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  params?: object;
  hash?: string;
  query?: any;
  state?: any;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  anchor?: React.ReactType;
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
    const { router, to, params, hash, query, state, response } = props;
    const pathname = to
      ? router.route.pathname(to, params)
      : response.location.pathname;
    const location = {
      hash,
      query,
      state,
      pathname
    };
    this.setState({ location });
  }

  componentWillMount() {
    this.setLocation(this.props);
  }

  componentWillReceiveProps(nextProps: BaseLinkProps) {
    this.setLocation(nextProps);
  }

  render(): React.ReactNode {
    const {
      to,
      params,
      hash,
      query,
      state,
      onClick,
      anchor,
      router,
      response,
      ...rest
    } = this.props;
    let anchorProps = rest;
    const Anchor: React.ReactType = anchor ? anchor : "a";

    const { location } = this.state;
    const href: string = router.history.toHref(location);

    return <Anchor {...anchorProps} onClick={this.clickHandler} href={href} />;
  }
}

const Link = (props: LinkProps): React.ReactElement<any> => (
  <Curious>
    {({ router, response }) => (
      <BaseLink {...props} router={router} response={response} />
    )}
  </Curious>
);

export default Link;
