/// <reference types="react" />
import React from "react";
import PropTypes from "prop-types";
import { GestureResponderEvent } from "react-native";
import { CuriRouter, Response } from "@curi/core";
import { CuriContext } from "@curi/react";
import { HickoryLocation } from "@hickory/root";
export interface ActiveLink {
    merge(props: object): object;
    partial?: boolean;
    extra?(l: HickoryLocation, d: object): boolean;
}
export interface LinkProps {
    to: string;
    params?: object;
    details?: object;
    onPress?: (e: GestureResponderEvent) => void;
    active?: ActiveLink;
    anchor?: React.ReactType;
    target?: string;
    router?: CuriRouter;
    response?: Response;
    style?: any;
}
export interface LinkState {
    pathname: string;
}
declare class Link extends React.Component<LinkProps, LinkState> {
    static contextTypes: {
        curi: PropTypes.Requireable<any>;
    };
    pressHandler: (event: GestureResponderEvent) => void;
    createPathname(props: LinkProps, context: CuriContext): void;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: LinkProps, nextContext: CuriContext): void;
    verifyActiveAddon(): void;
    render(): React.ReactElement<any>;
}
export default Link;
