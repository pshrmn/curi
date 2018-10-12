import React from "react";
import { CuriRouter, Emitted } from "@curi/router";
export declare type CuriRenderFn = (props: Emitted) => React.ReactNode;
export interface RouterProps {
    children: CuriRenderFn;
}
export interface RouterState {
    emitted: Emitted;
}
export default function curiProvider(router: CuriRouter): {
    new (props: RouterProps): {
        stopResponding: () => void;
        removed: boolean;
        componentDidMount(): void;
        setupRespond(router: CuriRouter): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        setState<K extends "emitted">(state: RouterState | ((prevState: Readonly<RouterState>, props: Readonly<RouterProps>) => RouterState | Pick<RouterState, K>) | Pick<RouterState, K>, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<RouterProps>;
        state: Readonly<RouterState>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<RouterProps>, nextState: Readonly<RouterState>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<RouterProps>, prevState: Readonly<RouterState>): any;
        componentDidUpdate?(prevProps: Readonly<RouterProps>, prevState: Readonly<RouterState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<RouterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<RouterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<RouterProps>, nextState: Readonly<RouterState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<RouterProps>, nextState: Readonly<RouterState>, nextContext: any): void;
    };
};
