/// <reference types="react" />
import React from "react";
import { GestureResponderEvent } from "react-native";
import { CuriRouter, Response } from "@curi/core";
import { HickoryLocation } from "@hickory/root";
export interface ActiveLink {
    merge(props: object): object;
    partial?: boolean;
    extra?(l: HickoryLocation, d: object): boolean;
}
export interface LinkProps {
    to: string;
    params?: object;
    details?: object;
    onPress?: (e: GestureResponderEvent) => void;
    active?: ActiveLink;
    anchor?: React.ReactType;
    target?: string;
    style?: any;
}
export interface BaseLinkProps extends LinkProps {
    router: CuriRouter;
    response: Response;
}
export interface LinkState {
    pathname: string;
}
declare const Link: (props: LinkProps) => JSX.Element;
export default Link;
