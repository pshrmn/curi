import React from "react";
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
declare const HookLink: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<any>>;
export default HookLink;
