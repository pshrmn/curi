import React from "react";
import { TouchableHighlight } from "react-native";
import {
  useNavigationHandler,
  useStatefulNavigationHandler,
  useURL
} from "@curi/react-universal";

import { GestureResponderEvent, TouchableHighlightProps } from "react-native";
import { NavType } from "@hickory/root";
import { RouteLocation } from "@curi/types";
import { NavigatingChildren } from "@curi/react-universal";

type BaseLinkProps = RouteLocation &
  TouchableHighlightProps & {
    anchor?: React.ReactType;
    onNav?: (e: GestureResponderEvent) => void;
    method?: NavType;
    target?: string;
  };

export interface LinkProps extends BaseLinkProps {
  children: React.ReactNode;
}

export interface AsyncLinkProps extends BaseLinkProps {
  children: NavigatingChildren;
}

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
