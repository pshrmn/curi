import React from "react";
import { TouchableHighlight } from "react-native";
import { useNavigationHandler } from "@curi/react-universal";
import shallowEqual from "shallowequal";

import { GestureResponderEvent } from "react-native";
import { RouteLocation } from "@curi/router";
import { NavigatingChildren } from "@curi/react-universal";

export interface LinkProps extends RouteLocation {
  onNav?: (e: GestureResponderEvent) => void;
  anchor?: React.ReactType;
  children: NavigatingChildren | React.ReactNode;
  forward?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

function canNavigate(event: GestureResponderEvent) {
  return !event.defaultPrevented;
}

const HookLink = React.forwardRef((props: LinkProps, ref: React.Ref<any>) => {
  const [navigating, setNavigating] = React.useState(false);
  const { handler, cancel } = useNavigationHandler<GestureResponderEvent>(
    props,
    setNavigating,
    canNavigate
  );
  React.useEffect(() => {
    return () => {
      if (cancel.current) {
        cancel.current();
      }
    };
  }, []);

  const { anchor: Anchor = TouchableHighlight, children, forward } = props;

  return (
    // @ts-ignore
    <Anchor onPress={handler} ref={ref} {...forward}>
      {typeof children === "function"
        ? (children as NavigatingChildren)(navigating)
        : children}
    </Anchor>
  );
});

export default HookLink;
