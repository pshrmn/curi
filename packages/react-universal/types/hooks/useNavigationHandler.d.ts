import React from "react";
import { ReactNode } from "react";
import { RouteLocation } from "@curi/router";
import { NavType } from "@hickory/root";
export declare type NavigatingChildren = (navigating: boolean) => ReactNode;
export interface NavigationHookProps<T> extends RouteLocation {
    children: NavigatingChildren | React.ReactNode;
    onNav?: (e: T) => void;
    forward?: object;
    method?: NavType;
}
export declare type CanNavigate<T> = (e: T, forward?: object) => boolean;
export default function useNavigationHandler<T extends React.BaseSyntheticEvent>(props: NavigationHookProps<T>, setNavigating: (n: boolean) => void, canNavigate?: CanNavigate<T>): {
    handler: (event: T) => void;
    cancel: React.MutableRefObject<any>;
};
