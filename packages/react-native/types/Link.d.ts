/// <reference types="react" />
import React from "react";
import { GestureResponderEvent } from "react-native";
import { CuriRouter, Response } from "@curi/core";
import { PartialLocation, LocationDetails } from "@hickory/root";
export declare type LinkMethod = "navigate" | "push" | "replace";
export interface LinkProps {
    to?: string;
    params?: object;
    details?: LocationDetails;
    onPress?: (e: GestureResponderEvent) => void;
    anchor?: React.ReactType;
    target?: string;
    style?: any;
    method?: LinkMethod;
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
