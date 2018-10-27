import React from "react";
import { GestureResponderEvent } from "react-native";
import { RouteLocation } from "@curi/router";
import { NavigatingChildren } from "@curi/react-universal";
export interface LinkProps extends RouteLocation {
    onNav?: (e: GestureResponderEvent) => void;
    anchor?: React.ReactType;
    children: NavigatingChildren | React.ReactNode;
    forward?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<any>>>;
export default _default;
