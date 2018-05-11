/// <reference types="react" />
import React from "react";
import { GestureResponderEvent } from "react-native";
import { CuriRouter, Response } from "@curi/core";
import { NavType } from "@hickory/root";
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
    forwardedRef: React.Ref<any> | undefined;
}
declare const Link: React.ComponentType<LinkProps & React.ClassAttributes<{}>>;
export default Link;
