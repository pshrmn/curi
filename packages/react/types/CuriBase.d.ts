/// <reference types="react" />
import React from "react";
import PropTypes from "prop-types";
import { CuriRouter, Response, Navigation } from "@curi/core";
import { CuriContext, CuriProps } from "./interface";
export interface CuriBaseProps {
    router: CuriRouter;
    render: (props: CuriProps) => React.ReactElement<any>;
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
