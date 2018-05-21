/// <reference types="react" />
import React from "react";
import { CuriRouter, Response } from "@curi/core";
export declare type LoadingChildren = (loading: boolean) => React.ReactNode;
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to?: string;
    params?: object;
    hash?: string;
    query?: any;
    state?: any;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    anchor?: React.ReactType;
    children: LoadingChildren | React.ReactNode;
}
export interface BaseLinkProps extends LinkProps {
    router: CuriRouter;
    response: Response;
    forwardedRef: React.Ref<any> | undefined;
}
export interface LinkState {
    loading: boolean;
}
declare const Link: React.ComponentType<LinkProps & React.ClassAttributes<{}>>;
export default Link;
