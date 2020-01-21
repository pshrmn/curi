import React from "react";
import { TouchableHighlight } from "react-native";
import {
  useNavigationHandler,
  useStatefulNavigationHandler,
  useURL
} from "@curi/react-universal";

import { GestureResponderEvent } from "react-native";
import { RouteLocation } from "@curi/types";
import { NavigatingChildren, NavigationHookProps } from "@curi/react-universal";

interface BaseLinkProps extends RouteLocation {
  anchor?: React.ReactType;
}

export type LinkProps = BaseLinkProps &
  NavigationHookProps<GestureResponderEvent> & {
    children: React.ReactNode;
  };

export type AsyncLinkProps = BaseLinkProps &
  NavigationHookProps<GestureResponderEvent> & {
    children: NavigatingChildren;
  };

function canNavigate(event: GestureResponderEvent) {
  return !event.defaultPrevented;
}

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
    anchor: Anchor = TouchableHighlight,
    ...rest
  } = props;
  let url = useURL({ name, params, query, hash });
  let { eventHandler } = useNavigationHandler<GestureResponderEvent>({
    url,
    state,
    onNav,
    method,
    canNavigate
  });

  return (
    <Anchor {...rest} onPress={eventHandler} ref={ref}>
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
      anchor: Anchor = TouchableHighlight,
      ...rest
    } = props;
    let url = useURL({ name, params, query, hash });
    let { eventHandler, navigating } = useStatefulNavigationHandler<
      GestureResponderEvent
    >({ url, state, onNav, method, canNavigate });

    return (
      <Anchor {...rest} onPress={eventHandler} ref={ref}>
        {children(navigating)}
      </Anchor>
    );
  }
);
