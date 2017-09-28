/// <reference types="react" />
import React from 'react';
import PropTypes from 'prop-types';
import { CuriContext } from './interface';
export interface ActiveLink {
    merge: (props: object) => object;
    partial?: boolean;
}
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string;
    params?: object;
    details?: object;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    active?: ActiveLink;
    anchor?: React.ComponentClass | React.StatelessComponent;
    target?: string;
}
export interface LinkState {
    pathname: string;
}
declare class Link extends React.Component<LinkProps, LinkState> {
    static contextTypes: {
        curi: PropTypes.Validator<any>;
        curiResponse: PropTypes.Requireable<any>;
    };
    clickHandler: (event: React.MouseEvent<HTMLElement>) => void;
    createPathname(props: LinkProps, context: CuriContext): void;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: LinkProps, nextContext: CuriContext): void;
    verifyActiveAddon(): void;
    render(): React.ReactElement<any>;
}
export default Link;
