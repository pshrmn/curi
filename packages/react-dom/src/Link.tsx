import React from "react";
import {
  useHref,
  useNavigationHandler,
  useStatefulNavigationHandler
} from "@curi/react-universal";
import { can_navigate } from "./utils";

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

export interface AsyncLinkProps extends BaseLinkProps {
  children: NavigatingChildren;
}

export const Link = React.forwardRef(
  (props: LinkProps, ref: React.Ref<any>) => {
    const href = useHref(props);

    const { event_handler } = useNavigationHandler<
      React.MouseEvent<HTMLElement>
    >(props, can_navigate);

    const { anchor: Anchor = "a", forward, children } = props;

    return (
      <Anchor onClick={event_handler} href={href} ref={ref} {...forward}>
        {children}
      </Anchor>
    );
  }
);

export const AsyncLink = React.forwardRef(
  (props: AsyncLinkProps, ref: React.Ref<any>) => {
    const href = useHref(props);

    const { event_handler, navigating } = useStatefulNavigationHandler<
      React.MouseEvent<HTMLElement>
    >(props, can_navigate);

    const { anchor: Anchor = "a", forward, children } = props;

    return (
      <Anchor onClick={event_handler} href={href} ref={ref} {...forward}>
        {children(navigating)}
      </Anchor>
    );
  }
);
