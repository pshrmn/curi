import React from "react";
import { GestureResponderEvent } from "react-native";
import { RouteLocation } from "@curi/types";
import { NavigatingChildren, NavigationHookProps } from "@curi/react-universal";
interface BaseLinkProps extends RouteLocation {
    anchor?: React.ReactType;
}
export declare type LinkProps = BaseLinkProps & NavigationHookProps<GestureResponderEvent> & {
    children: React.ReactNode;
};
export declare type AsyncLinkProps = BaseLinkProps & NavigationHookProps<GestureResponderEvent> & {
    children: NavigatingChildren;
};
export declare const Link: React.ForwardRefExoticComponent<BaseLinkProps & NavigationHookProps<GestureResponderEvent> & {
    children: React.ReactNode;
} & React.RefAttributes<any>>;
export declare const AsyncLink: React.ForwardRefExoticComponent<BaseLinkProps & NavigationHookProps<GestureResponderEvent> & {
    children: NavigatingChildren;
} & React.RefAttributes<any>>;
export {};
