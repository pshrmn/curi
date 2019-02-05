import React from "react";
import { useHref, useNavigationHandler } from "@curi/react-universal";
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
  const href = useHref(props);

  const { eventHandler, children } = useNavigationHandler<
    React.MouseEvent<HTMLElement>
  >(props, canNavigate);

  const { anchor: Anchor = "a", forward } = props;

  return (
    // @ts-ignore
    <Anchor onClick={eventHandler} href={href} ref={ref} {...forward}>
      {children}
    </Anchor>
  );
});

export default HookLink;
