import React from "react";
import { ReactNode } from "react";
import { NavType } from "@hickory/root";
export interface NavigationHookProps<T> {
    onNav?: (e: T) => void;
    method?: NavType;
    forward?: object;
    state?: any;
}
export declare type NavigatingChildren = (navigating: boolean) => ReactNode;
export declare type CanNavigate<T> = (e: T, target?: string) => boolean;
export declare function useNavigationHandler<T extends React.BaseSyntheticEvent>(url: string, props: NavigationHookProps<T>, canNavigate?: CanNavigate<T>): {
    url: string;
    eventHandler: (event: T) => void;
};
export declare function useStatefulNavigationHandler<T extends React.BaseSyntheticEvent>(url: string, props: NavigationHookProps<T>, canNavigate?: CanNavigate<T>): {
    url: string;
    eventHandler: (event: T) => void;
    navigating: boolean;
};
