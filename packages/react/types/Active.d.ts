/// <reference types="react" />
import React from 'react';
import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { CuriConfig, Response } from '@curi/core';
export interface ActiveProps {
    children: ReactElement<any>;
    name: string;
    params?: object;
    partial?: boolean;
    merge: (props: object) => object;
    curi?: CuriConfig;
    response?: Response;
}
declare class Active extends React.Component<ActiveProps, {}> {
    static contextTypes: {
        curi: PropTypes.Requireable<any>;
        curiResponse: PropTypes.Requireable<any>;
    };
    componentWillMount(): void;
    verifyActiveAddon(): void;
    render(): React.ReactElement<any>;
}
export default Active;
