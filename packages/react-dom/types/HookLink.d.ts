import React from "react";
import { RouteLocation } from "@curi/router";
import { NavigatingChildren } from "@curi/react-universal";
export interface LinkProps extends RouteLocation {
    onNav?: (e: React.MouseEvent<HTMLElement>) => void;
    anchor?: React.ReactType;
    children: NavigatingChildren | React.ReactNode;
    forward?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<any>>>;
export default _default;
