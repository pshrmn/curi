/// <reference types="react" />
import React from 'react';
import PropTypes from 'prop-types';
export interface ActiveProps {
    children: any;
    name: string;
    params?: object;
    partial?: boolean;
    merge: (props: object) => object;
}
declare class Active extends React.Component<ActiveProps, {}> {
    static contextTypes: {
        curi: PropTypes.Validator<any>;
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
