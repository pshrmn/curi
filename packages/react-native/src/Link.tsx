import React from "react";
import { TouchableHighlight, TouchableHighlightProps } from "react-native";
import {
  useNavigationHandler,
  useStatefulNavigationHandler
} from "@curi/react-universal";

import { GestureResponderEvent } from "react-native";
import { RouteLocation } from "@curi/types";
import { NavigatingChildren } from "@curi/react-universal";
import { NavType } from "@hickory/root";

export interface BaseLinkProps extends RouteLocation {
  onNav?: (e: GestureResponderEvent) => void;
  anchor?: React.ReactType;
  forward?: object;
  method?: NavType;
}

export interface LinkProps extends BaseLinkProps {
  children: React.ReactNode;
}

export interface AsyncLinkProps extends BaseLinkProps {
  children: NavigatingChildren;
}

function canNavigate(event: GestureResponderEvent) {
  return !event.defaultPrevented;
}

export const Link = React.forwardRef(
  (props: LinkProps, ref: React.Ref<any>) => {
    const { eventHandler } = useNavigationHandler<GestureResponderEvent>(
      props,
      canNavigate
    );

    const { anchor: Anchor = TouchableHighlight, forward, children } = props;

    return (
      <Anchor {...forward} onPress={eventHandler} ref={ref}>
        {children}
      </Anchor>
    );
  }
);

export const AsyncLink = React.forwardRef(
  (props: AsyncLinkProps, ref: React.Ref<any>) => {
    const { eventHandler, navigating } = useStatefulNavigationHandler<
      GestureResponderEvent
    >(props, canNavigate);

    const { anchor: Anchor = TouchableHighlight, forward, children } = props;

    return (
      <Anchor {...forward} onPress={eventHandler} ref={ref}>
        {children(navigating)}
      </Anchor>
    );
  }
);
