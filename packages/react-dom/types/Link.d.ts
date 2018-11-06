import React from "react";
export declare type NavigatingChildren = (navigating: boolean) => React.ReactNode;
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to?: string;
    name?: string;
    params?: object;
    hash?: string;
    query?: any;
    state?: any;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    anchor?: React.ReactType;
    children: NavigatingChildren | React.ReactNode;
    anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}
declare const Link: React.ComponentType<LinkProps & React.ClassAttributes<{}>>;
export default Link;
