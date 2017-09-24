/// <reference types="react" />
import React from 'react';
import PropTypes from 'prop-types';
import { CuriConfig, AnyResponse } from '@curi/core';
import { CuriContext } from './interface';
export interface NavigatorProps {
    config: CuriConfig;
    render: (r: AnyResponse, c?: CuriConfig) => React.ReactElement<any>;
    response?: AnyResponse;
}
export interface NavigatorState {
    response: AnyResponse;
}
declare class Navigator extends React.Component<NavigatorProps, NavigatorState> {
    unsubscribe: () => void;
    static childContextTypes: {
        curi: PropTypes.Requireable<any>;
        curiResponse: PropTypes.Requireable<any>;
    };
    state: NavigatorState;
    getChildContext(): CuriContext;
    setResponse: (response: AnyResponse) => void;
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<any>;
}
export default Navigator;
