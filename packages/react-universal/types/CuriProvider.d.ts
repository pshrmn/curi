import React from "react";
import { CuriRouter, CurrentResponse, Emitted } from "@curi/router";
export declare type CuriRenderFn = (props: Emitted) => React.ReactNode;
export interface CuriProviderProps {
    children: CuriRenderFn;
    router: CuriRouter;
}
export interface CuriProviderState {
    router: CuriRouter;
    emitted: CurrentResponse;
}
declare class CuriProvider extends React.Component<CuriProviderProps, CuriProviderState> {
    stopResponding: () => void;
    removed: boolean;
    constructor(props: CuriProviderProps);
    static getDerivedStateFromProps(nextProps: CuriProviderProps, prevState: CuriProviderState): {
        router: CuriRouter;
        emitted: CurrentResponse;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: CuriProviderProps): void;
    setupRespond(router: CuriRouter): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default CuriProvider;
