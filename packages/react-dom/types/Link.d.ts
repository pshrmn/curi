import React from "react";
import { RouteLocation } from "@curi/router";
import { NavigatingChildren } from "@curi/react-universal";
export interface BaseLinkProps extends RouteLocation {
    onNav?: (e: React.MouseEvent<HTMLElement>) => void;
    anchor?: React.ReactType;
    forward?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}
export interface LinkProps extends BaseLinkProps {
    children: React.ReactNode;
}
export interface AsyncLinkProps extends BaseLinkProps {
    children: NavigatingChildren;
}
export declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<any>>;
export declare const AsyncLink: React.ForwardRefExoticComponent<AsyncLinkProps & React.RefAttributes<any>>;
