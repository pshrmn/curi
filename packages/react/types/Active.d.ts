/// <reference types="react" />
import React from 'react';
import PropTypes from 'prop-types';
import { CuriConfig, AnyResponse } from '@curi/core';
export interface ActiveProps {
    children: any;
    name: string;
    params?: object;
    partial?: boolean;
    merge: (props: object) => object;
    curi?: CuriConfig;
    response?: AnyResponse;
}
declare class Active extends React.Component<ActiveProps, {}> {
    static contextTypes: {
        curi: PropTypes.Requireable<any>;
        curiResponse: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        partial: boolean;
    };
    componentWillMount(): void;
    verifyActiveAddon(): void;
    render(): React.DetailedReactHTMLElement<any, HTMLElement>;
}
export default Active;
