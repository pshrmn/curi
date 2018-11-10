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
    forward?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}
declare const _default: React.ForwardRefExoticComponent<LinkProps & React.ClassAttributes<{}>>;
export default /** #__PURE__ */ _default;
