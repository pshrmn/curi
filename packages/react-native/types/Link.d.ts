import React from "react";
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
export declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<any>>;
export declare const AsyncLink: React.ForwardRefExoticComponent<AsyncLinkProps & React.RefAttributes<any>>;
