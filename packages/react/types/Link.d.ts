/// <reference types="react" />
import React from "react";
import { CuriRouter, Response } from "@curi/core";
import { HickoryLocation } from "@hickory/root";
export interface ActiveLink {
    merge(props: object): object;
    partial?: boolean;
    extra?(l: HickoryLocation, d: object): boolean;
}
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string;
    params?: object;
    details?: object;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    active?: ActiveLink;
    anchor?: React.ReactType;
    target?: string;
}
export interface BaseLinkProps extends LinkProps {
    router: CuriRouter;
    response: Response;
}
export interface LinkState {
    pathname: string;
}
declare const Link: (props: LinkProps) => React.ReactElement<any>;
export default Link;
