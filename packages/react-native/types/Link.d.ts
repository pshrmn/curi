import React from "react";
import { GestureResponderEvent, TouchableHighlightProps } from "react-native";
import { NavType } from "@hickory/root";
import { RouteLocation } from "@curi/types";
import { NavigatingChildren } from "@curi/react-universal";
declare type BaseLinkProps = RouteLocation & TouchableHighlightProps & {
    anchor?: React.ReactType;
    onNav?: (e: GestureResponderEvent) => void;
    method?: NavType;
    target?: string;
};
export interface LinkProps extends BaseLinkProps {
    children: React.ReactNode;
}
export interface AsyncLinkProps extends BaseLinkProps {
    children: NavigatingChildren;
}
export declare let Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<any>>;
export declare let AsyncLink: React.ForwardRefExoticComponent<AsyncLinkProps & React.RefAttributes<any>>;
export {};
