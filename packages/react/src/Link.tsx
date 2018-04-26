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

class BaseLink extends React.Component<BaseLinkProps> {
  clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const { onClick, router, target } = this.props;
    if (onClick) {
      onClick(event);
    }

    if (canNavigate(event) && !target) {
      event.preventDefault();
      const { to: name, params, query, state, hash } = this.props;
      router.navigate({
        name,
        params,
        query,
        state,
        hash
      });
    }
  };

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
    const Anchor: React.ReactType = anchor ? anchor : "a";

    const pathname = to
      ? router.route.pathname(to, params)
      : response.location.pathname;
    const location = {
      hash,
      query,
      state,
      pathname
    };
    const href: string = router.history.toHref(location);

    return <Anchor {...rest} onClick={this.clickHandler} href={href} />;
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
