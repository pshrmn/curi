/// <reference types="react" />
import React from "react";
import { CuriRouter, Emitted, Response, Navigation } from "@curi/core";
export declare type CuriRenderFn = (props: Emitted) => React.ReactNode;
export interface CuriProviderProps {
    children: CuriRenderFn;
    router?: CuriRouter;
}
export interface CuriProviderState {
    response: Response;
    navigation: Navigation;
}
declare class CuriProvider extends React.Component<CuriProviderProps, CuriProviderState> {
    stopResponding: () => void;
    constructor(props: CuriProviderProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: CuriProviderProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default CuriProvider;
