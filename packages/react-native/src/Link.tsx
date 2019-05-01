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

export const Link = React.forwardRef(
  (props: LinkProps, ref: React.Ref<any>) => {
    const url = useURL(props);
    const {
      anchor: Anchor = TouchableHighlight,
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
    const { eventHandler } = useNavigationHandler<GestureResponderEvent>(
      url,
      props,
      canNavigate
    );

    return (
      <Anchor {...rest} onPress={eventHandler} ref={ref}>
        {children}
      </Anchor>
    );
  }
);

export const AsyncLink = React.forwardRef(
  (props: AsyncLinkProps, ref: React.Ref<any>) => {
    const url = useURL(props);
    const {
      anchor: Anchor = TouchableHighlight,
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
      GestureResponderEvent
    >(url, props, canNavigate);

    return (
      <Anchor {...rest} onPress={eventHandler} ref={ref}>
        {children(navigating)}
      </Anchor>
    );
  }
);
