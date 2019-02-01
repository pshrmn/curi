import React from "react";
import { useHref, useNavigationHandler } from "@curi/react-universal";
import shallowEqual from "shallowequal";
import { canNavigate } from "./utils";

import { RouteLocation } from "@curi/router";
import { NavigatingChildren } from "@curi/react-universal";

export interface LinkProps extends RouteLocation {
  onNav?: (e: React.MouseEvent<HTMLElement>) => void;
  anchor?: React.ReactType;
  children: NavigatingChildren | React.ReactNode;
  forward?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

const HookLink = React.forwardRef((props: LinkProps, ref: React.Ref<any>) => {
  const [navigating, setNavigating] = React.useState(false);
  const href = useHref(props);
  const { handler, cancel } = useNavigationHandler<
    React.MouseEvent<HTMLElement>
  >(props, setNavigating, canNavigate);
  React.useEffect(() => {
    return () => {
      if (cancel.current) {
        cancel.current();
      }
    };
  }, []);

  const { anchor: Anchor = "a", children, forward } = props;

  return (
    // @ts-ignore
    <Anchor onClick={handler} href={href} ref={ref} {...forward}>
      {typeof children === "function"
        ? (children as NavigatingChildren)(navigating)
        : children}
    </Anchor>
  );
});

function propCompare(prevProps: LinkProps, nextProps: LinkProps) {
  return (
    prevProps.children === nextProps.children &&
    prevProps.name === nextProps.name &&
    prevProps.hash === nextProps.hash &&
    prevProps.query === nextProps.query &&
    prevProps.onNav === nextProps.onNav &&
    prevProps.anchor === nextProps.anchor &&
    shallowEqual(prevProps.params, nextProps.params) &&
    shallowEqual(prevProps.state, nextProps.state) &&
    shallowEqual(prevProps.forward, nextProps.forward)
  );
}

export default React.memo(HookLink, propCompare);
