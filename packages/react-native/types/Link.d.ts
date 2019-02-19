import React from "react";
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
export interface NavLinkProps extends BaseLinkProps {
    children: NavigatingChildren;
}
export declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<any>>;
export declare const NavLink: React.ForwardRefExoticComponent<NavLinkProps & React.RefAttributes<any>>;
