import React from "react";
import {
  useNavigationHandler,
  useStatefulNavigationHandler,
  useURL
} from "@curi/react-universal";

import { MouseEvent } from "react";
import { RouteLocation } from "@curi/types";
import { NavType } from "@hickory/root";
import { NavigatingChildren } from "@curi/react-universal";

type BaseLinkProps = RouteLocation &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    anchor?: React.ReactType;
    onNav?: (e: React.MouseEvent<HTMLElement>) => void;
    method?: NavType;
    target?: string;
  };

export interface LinkProps extends BaseLinkProps {
  children: React.ReactNode;
}

export interface AsyncLinkProps extends BaseLinkProps {
  children: NavigatingChildren;
}

let canNavigate = (event: MouseEvent<HTMLElement>, target?: string) => {
  return (
    !event.defaultPrevented &&
    !target &&
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
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
