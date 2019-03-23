import React from "react";
import { TouchableHighlight } from "react-native";
import {
  useNavigationHandler,
  useStatefulNavigationHandler
} from "@curi/react-universal";

import { GestureResponderEvent } from "react-native";
import { RouteLocation } from "@curi/router";
import { NavigatingChildren } from "@curi/react-universal";
import { NavType } from "@hickory/root";

export interface BaseLinkProps extends RouteLocation {
  onNav?: (e: GestureResponderEvent) => void;
  anchor?: React.ReactType;
  forward?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  method?: NavType;
}

export interface LinkProps extends BaseLinkProps {
  children: React.ReactNode;
}

export interface AsyncLinkProps extends BaseLinkProps {
  children: NavigatingChildren;
}

function can_navigate(event: GestureResponderEvent) {
  return !event.defaultPrevented;
}

export const Link = React.forwardRef(
  (props: LinkProps, ref: React.Ref<any>) => {
    const { event_handler } = useNavigationHandler<GestureResponderEvent>(
      props,
      can_navigate
    );

    const { anchor: Anchor = TouchableHighlight, forward, children } = props;

    return (
      <Anchor onPress={event_handler} ref={ref} {...forward}>
        {children}
      </Anchor>
    );
  }
);

export const AsyncLink = React.forwardRef(
  (props: AsyncLinkProps, ref: React.Ref<any>) => {
    const { event_handler, navigating } = useStatefulNavigationHandler<
      GestureResponderEvent
    >(props, can_navigate);

    const { anchor: Anchor = TouchableHighlight, forward, children } = props;

    return (
      <Anchor onPress={event_handler} ref={ref} {...forward}>
        {children(navigating)}
      </Anchor>
    );
  }
);
