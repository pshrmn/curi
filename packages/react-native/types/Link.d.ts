/// <reference types="react" />
import React from "react";
import { GestureResponderEvent } from "react-native";
import { CuriRouter, Response } from "@curi/core";
import { PartialLocation, NavType } from "@hickory/root";
export interface LinkProps {
    to?: string;
    params?: object;
    hash?: string;
    query?: any;
    state?: any;
    onPress?: (e: GestureResponderEvent) => void;
    anchor?: React.ReactType;
    target?: string;
    style?: any;
    method?: NavType;
}
export interface BaseLinkProps extends LinkProps {
    router: CuriRouter;
    response: Response;
}
export interface LinkState {
    location: PartialLocation;
}
declare const Link: (props: LinkProps) => JSX.Element;
export default Link;
