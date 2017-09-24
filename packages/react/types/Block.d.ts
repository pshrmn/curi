/// <reference types="react" />
import React from 'react';
import PropTypes from 'prop-types';
import { ConfirmationFunction } from '@hickory/root';
export interface BlockProps {
    active?: boolean;
    confirm: ConfirmationFunction;
}
declare class Block extends React.Component<BlockProps> {
    static contextTypes: {
        curi: PropTypes.Validator<any>;
    };
    static defaultProps: {
        active: boolean;
    };
    on(): void;
    off(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: BlockProps): void;
    componentWillUnmount(): void;
    render(): null;
}
export default Block;
