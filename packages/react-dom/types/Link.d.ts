import React from "react";
import { RouteLocation } from "@curi/types";
import { NavigatingChildren, NavigationHookProps } from "@curi/react-universal";
interface BaseLinkProps extends RouteLocation {
    anchor?: React.ReactType;
}
export declare type LinkProps = BaseLinkProps & NavigationHookProps<React.MouseEvent<HTMLElement>> & {
    children: React.ReactNode;
};
export declare type AsyncLinkProps = BaseLinkProps & NavigationHookProps<React.MouseEvent<HTMLElement>> & {
    children: NavigatingChildren;
};
export declare const Link: React.ForwardRefExoticComponent<BaseLinkProps & NavigationHookProps<React.MouseEvent<HTMLElement, MouseEvent>> & {
    children: React.ReactNode;
} & React.RefAttributes<any>>;
export declare const AsyncLink: React.ForwardRefExoticComponent<BaseLinkProps & NavigationHookProps<React.MouseEvent<HTMLElement, MouseEvent>> & {
    children: NavigatingChildren;
} & React.RefAttributes<any>>;
export {};
