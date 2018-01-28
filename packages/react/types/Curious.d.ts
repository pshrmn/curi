/// <reference types="react" />
import React from "react";
import PropTypes from "prop-types";
import { CuriContext } from "./interface";
import { CuriRouter, ResponseHandlerProps, Response, Navigation } from "@curi/core";
export interface CuriousProps {
    render(p: ResponseHandlerProps): React.ReactElement<any>;
    router?: CuriRouter;
    responsive?: boolean;
}
export interface CuriousState {
    response: Response;
    navigation: Navigation;
}
export default class Curious extends React.Component<CuriousProps, CuriousState> {
    stopResponding: () => void;
    isResponsive: boolean;
    static contextTypes: {
        curi: PropTypes.Requireable<any>;
    };
    constructor(props: CuriousProps, context: CuriContext);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: CuriousProps): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<any>;
}
