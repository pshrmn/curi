import React from "react";
import { ReactNode } from "react";
import { RouteLocation } from "@curi/types";
import { NavType } from "@hickory/root";
export declare type NavigatingChildren = (navigating: boolean) => ReactNode;
export interface NavigationHookProps<T> extends BaseNavigationHookProps<T> {
    children: React.ReactNode;
}
export interface StatefulNavigationHookProps<T> extends BaseNavigationHookProps<T> {
    children: NavigatingChildren;
}
export interface BaseNavigationHookProps<T> extends RouteLocation {
    onNav?: (e: T) => void;
    forward?: object;
    method?: NavType;
}
export declare type CanNavigate<T> = (e: T, forward?: object) => boolean;
export declare function useNavigationHandler<T extends React.BaseSyntheticEvent>(props: NavigationHookProps<T>, canNavigate?: CanNavigate<T>): {
    eventHandler: (event: T) => void;
};
export declare function useStatefulNavigationHandler<T extends React.BaseSyntheticEvent>(props: StatefulNavigationHookProps<T>, canNavigate?: CanNavigate<T>): {
    eventHandler: (event: T) => void;
    navigating: boolean;
};
