/// <reference types="react" />
import React from 'react';
import PropTypes from 'prop-types';
import { CuriConfig } from '@curi/core';
export interface ProviderProps {
    curi: CuriConfig;
    children: any;
}
export default class CuriProvider extends React.Component<ProviderProps> {
    static propTypes: {
        curi: PropTypes.Validator<any>;
        children: PropTypes.Validator<any>;
    };
    static childContextTypes: {
        curi: PropTypes.Requireable<any>;
    };
    getChildContext(): {
        curi: CuriConfig;
    };
    render(): any;
}
