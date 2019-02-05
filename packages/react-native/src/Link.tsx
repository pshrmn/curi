import React from "react";
import { TouchableHighlight } from "react-native";
import { useNavigationHandler } from "@curi/react-universal";

import { GestureResponderEvent } from "react-native";
import { RouteLocation } from "@curi/router";
import { NavigatingChildren } from "@curi/react-universal";
import { NavType } from "@hickory/root";

export interface LinkProps extends RouteLocation {
  onNav?: (e: GestureResponderEvent) => void;
  anchor?: React.ReactType;
  children: NavigatingChildren | React.ReactNode;
  forward?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  method?: NavType;
}

function canNavigate(event: GestureResponderEvent) {
  return !event.defaultPrevented;
}

const HookLink = React.forwardRef((props: LinkProps, ref: React.Ref<any>) => {
  const { eventHandler, children } = useNavigationHandler<
    GestureResponderEvent
  >(props, canNavigate);

  const { anchor: Anchor = TouchableHighlight, forward } = props;

  return (
    // @ts-ignore
    <Anchor onPress={eventHandler} ref={ref} {...forward}>
      {children}
    </Anchor>
  );
});

export default HookLink;
