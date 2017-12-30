/// <reference types="react" />
import React from 'react';
import PropTypes from 'prop-types';
import { CuriRouter, Response } from '@curi/core';
import { CuriContext } from './interface';
import { Action } from '@hickory/root';
export interface CuriBaseProps {
    router: CuriRouter;
    render: (r: Response, action: string, c?: CuriRouter) => React.ReactElement<any>;
    response: Response;
    action?: Action;
}
declare class CuriBase extends React.Component<CuriBaseProps> {
    static childContextTypes: {
        curi: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        action: string;
    };
    getChildContext(): CuriContext;
    render(): React.ReactElement<any>;
}
export default CuriBase;
