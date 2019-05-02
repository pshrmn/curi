import React from "react";
import { ReactNode } from "react";
import { NavType } from "@hickory/root";
export interface NavigationHookProps<T> {
    url: string;
    onNav?: (e: T) => void;
    method?: NavType;
    target?: string;
    state?: any;
    canNavigate: CanNavigate<T>;
}
export declare type NavigatingChildren = (navigating: boolean) => ReactNode;
export declare type CanNavigate<T> = (e: T, target?: string) => boolean;
export declare function useNavigationHandler<T extends React.BaseSyntheticEvent>(props: NavigationHookProps<T>): {
    url: string;
    eventHandler: (event: T) => void;
};
export declare function useStatefulNavigationHandler<T extends React.BaseSyntheticEvent>(props: NavigationHookProps<T>): {
    url: string;
    eventHandler: (event: T) => void;
    navigating: boolean;
};
