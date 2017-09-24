/// <reference types="react" />
import React from 'react';
import PropTypes from 'prop-types';
export interface RedirectProps {
    to?: string;
    params?: object;
    details?: object;
    children?: any;
}
declare class Redirect extends React.Component<RedirectProps, {}> {
    static contextTypes: {
        curi: PropTypes.Validator<any>;
    };
    componentDidMount(): void;
    render(): any;
}
export default Redirect;
