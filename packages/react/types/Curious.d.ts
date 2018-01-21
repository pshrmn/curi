/// <reference types="react" />
import React from "react";
import PropTypes from "prop-types";
import { CuriContext } from "./interface";
import { CuriRouter, Response } from "@curi/core";
import { Action } from "@hickory/root";
export interface CuriousProps {
    render(p: CuriousRenderProps): React.ReactElement<any>;
    router?: CuriRouter;
    responsive?: boolean;
}
export interface CuriousRenderProps {
    router: CuriRouter;
    response: Response;
    action: Action;
}
export interface CuriousState {
    response: Response;
    action: Action;
}
export default class Curious extends React.Component<CuriousProps, CuriousState> {
    stopResponding: () => void;
    static contextTypes: {
        curi: PropTypes.Requireable<any>;
    };
    constructor(props: CuriousProps, context: CuriContext);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: CuriousProps): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<any>;
}
