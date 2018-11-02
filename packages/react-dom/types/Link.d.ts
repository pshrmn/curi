import React from "react";
import { CuriRouter } from "@curi/router";
export declare type NavigatingChildren = (navigating: boolean) => React.ReactNode;
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to?: string;
    params?: object;
    hash?: string;
    query?: any;
    state?: any;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    anchor?: React.ReactType;
    children: NavigatingChildren | React.ReactNode;
}
export interface BaseLinkProps extends LinkProps {
    router: CuriRouter;
    forwardedRef: React.Ref<any> | undefined;
}
export interface LinkState {
    navigating: boolean;
}
declare const Link: React.ComponentType<LinkProps & React.ClassAttributes<{}>>;
export default Link;
