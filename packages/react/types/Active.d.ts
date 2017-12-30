/// <reference types="react" />
import React from 'react';
import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { CuriRouter, Response } from '@curi/core';
import { HickoryLocation } from '@hickory/root';
export interface ActiveProps {
    children: ReactElement<any>;
    name: string;
    params?: object;
    partial?: boolean;
    merge(props: object): object;
    extra?(l: HickoryLocation, d: object): boolean;
    details?: object;
    curi?: CuriRouter;
    response?: Response;
}
declare class Active extends React.Component<ActiveProps, {}> {
    static contextTypes: {
        curi: PropTypes.Requireable<any>;
    };
    componentWillMount(): void;
    verifyActiveAddon(): void;
    render(): React.ReactElement<any>;
}
export default Active;
