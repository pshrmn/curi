import React from "react";
import { CuriRouter, Emitted } from "@curi/router";
export declare type CuriRenderFn = (props: Emitted) => React.ReactNode;
export interface CuriProviderProps {
    children: CuriRenderFn;
    router: CuriRouter;
}
declare class CuriProvider extends React.Component<CuriProviderProps> {
    stopResponding: () => void;
    removed: boolean;
    constructor(props: CuriProviderProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: CuriProviderProps): void;
    setupRespond(router: CuriRouter): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default CuriProvider;
