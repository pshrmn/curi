import React from "react";
import { GestureResponderEvent } from "react-native";
import { NavType } from "@hickory/root";
export declare type NavigatingChildren = (navigating: boolean) => React.ReactNode;
export interface LinkProps {
    to?: string;
    name?: string;
    params?: object;
    hash?: string;
    query?: any;
    state?: any;
    onPress?: (e: GestureResponderEvent) => void;
    anchor?: React.ReactType;
    target?: string;
    style?: any;
    method?: NavType;
    children: NavigatingChildren | React.ReactNode;
    forward?: object;
}
declare const Link: React.ComponentType<LinkProps & React.ClassAttributes<{}>>;
export default Link;
