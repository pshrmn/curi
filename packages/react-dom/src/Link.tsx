import React from "react";
import {
  useNavigationHandler,
  useStatefulNavigationHandler,
  useURL
} from "@curi/react-universal";
import { canNavigate } from "./utils";

import { RouteLocation } from "@curi/types";
import { NavigatingChildren, NavigationHookProps } from "@curi/react-universal";

interface BaseLinkProps extends RouteLocation {
  anchor?: React.ReactType;
}

export type LinkProps = BaseLinkProps &
  NavigationHookProps<React.MouseEvent<HTMLElement>> & {
    children: React.ReactNode;
  };

export type AsyncLinkProps = BaseLinkProps &
  NavigationHookProps<React.MouseEvent<HTMLElement>> & {
    children: NavigatingChildren;
  };

export const Link = React.forwardRef(
  (props: LinkProps, ref: React.Ref<any>) => {
    const url = useURL(props);
    const {
      anchor: Anchor = "a",
      children,
      name,
      params,
      query,
      hash,
      state,
      onNav,
      method,
      ...rest
    } = props;
    const { eventHandler } = useNavigationHandler<
      React.MouseEvent<HTMLElement>
    >(url, props, canNavigate);

    return (
      <Anchor {...rest} onClick={eventHandler} href={url} ref={ref}>
        {children}
      </Anchor>
    );
  }
);

export const AsyncLink = React.forwardRef(
  (props: AsyncLinkProps, ref: React.Ref<any>) => {
    const url = useURL(props);
    const {
      anchor: Anchor = "a",
      children,
      name,
      params,
      query,
      hash,
      state,
      onNav,
      method,
      ...rest
    } = props;
    const { eventHandler, navigating } = useStatefulNavigationHandler<
      React.MouseEvent<HTMLElement>
    >(url, props, canNavigate);

    return (
      <Anchor {...rest} onClick={eventHandler} href={url} ref={ref}>
        {children(navigating)}
      </Anchor>
    );
  }
);
