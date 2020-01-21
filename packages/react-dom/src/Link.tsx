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

export let Link = React.forwardRef((props: LinkProps, ref: React.Ref<any>) => {
  let {
    // url
    name,
    params,
    query,
    hash,
    // navigation
    state,
    onNav,
    method,
    // props
    children,
    anchor: Anchor = "a",
    ...rest
  } = props;
  let url = useURL({ name, params, query, hash });
  let { eventHandler } = useNavigationHandler<React.MouseEvent<HTMLElement>>({
    url,
    state,
    onNav,
    method,
    canNavigate,
    target: rest.target
  });

  return (
    <Anchor {...rest} onClick={eventHandler} href={url} ref={ref}>
      {children}
    </Anchor>
  );
});

export let AsyncLink = React.forwardRef(
  (props: AsyncLinkProps, ref: React.Ref<any>) => {
    let {
      // url
      name,
      params,
      query,
      hash,
      // navigation
      state,
      onNav,
      method,
      // props
      children,
      anchor: Anchor = "a",
      ...rest
    } = props;
    let url = useURL({ name, params, query, hash });
    let { eventHandler, navigating } = useStatefulNavigationHandler<
      React.MouseEvent<HTMLElement>
    >({ url, state, onNav, method, canNavigate, target: rest.target });

    return (
      <Anchor {...rest} onClick={eventHandler} href={url} ref={ref}>
        {children(navigating)}
      </Anchor>
    );
  }
);
