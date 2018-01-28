/// <reference types="react" />
import React from "react";
import PropTypes from "prop-types";
import { CuriRouter, ResponseHandlerProps, Response, Navigation } from "@curi/core";
import { CuriContext } from "./interface";
export declare type CuriRenderFn = (props: ResponseHandlerProps) => React.ReactElement<any>;
export interface CuriBaseProps {
    router: CuriRouter;
    render: CuriRenderFn;
    response: Response;
    navigation: Navigation;
}
declare class CuriBase extends React.Component<CuriBaseProps> {
    static childContextTypes: {
        curi: PropTypes.Requireable<any>;
    };
    getChildContext(): CuriContext;
    render(): React.ReactElement<any>;
}
export default CuriBase;
