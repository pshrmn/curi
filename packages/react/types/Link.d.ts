/// <reference types="react" />
import React from "react";
import { CuriRouter, Response } from "@curi/core";
import { PartialLocation } from "@hickory/root";
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to?: string;
    params?: object;
    hash?: string;
    query?: any;
    state?: any;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    anchor?: React.ReactType;
}
export interface BaseLinkProps extends LinkProps {
    router: CuriRouter;
    response: Response;
}
export interface LinkState {
    location: PartialLocation;
}
declare const Link: (props: LinkProps) => React.ReactElement<any>;
export default Link;
