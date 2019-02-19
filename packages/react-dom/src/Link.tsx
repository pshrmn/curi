import React from "react";
import {
  useHref,
  useNavigationHandler,
  useStatefulNavigationHandler
} from "@curi/react-universal";
import { canNavigate } from "./utils";

import { RouteLocation } from "@curi/router";
import { NavigatingChildren } from "@curi/react-universal";

export interface BaseLinkProps extends RouteLocation {
  onNav?: (e: React.MouseEvent<HTMLElement>) => void;
  anchor?: React.ReactType;
  forward?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

export interface LinkProps extends BaseLinkProps {
  children: React.ReactNode;
}

export interface NavLinkProps extends BaseLinkProps {
  children: NavigatingChildren;
}

export const Link = React.forwardRef(
  (props: LinkProps, ref: React.Ref<any>) => {
    const href = useHref(props);

    const { eventHandler } = useNavigationHandler<
      React.MouseEvent<HTMLElement>
    >(props, canNavigate);

    const { anchor: Anchor = "a", forward, children } = props;

    return (
      // @ts-ignore
      <Anchor onClick={eventHandler} href={href} ref={ref} {...forward}>
        {children}
      </Anchor>
    );
  }
);

export const NavLink = React.forwardRef(
  (props: NavLinkProps, ref: React.Ref<any>) => {
    const href = useHref(props);

    const { eventHandler, navigating } = useStatefulNavigationHandler<
      React.MouseEvent<HTMLElement>
    >(props, canNavigate);

    const { anchor: Anchor = "a", forward, children } = props;

    return (
      // @ts-ignore
      <Anchor onClick={eventHandler} href={href} ref={ref} {...forward}>
        {children(navigating)}
      </Anchor>
    );
  }
);
