/// <reference types="react" />
import React from 'react';
import { CuriConfig, AnyResponse } from '@curi/core';
export interface CuriousProps {
    internalRef?: (node: any) => void;
    children?: any;
}
export interface CuriousComponent {
    curi?: CuriConfig;
    response?: AnyResponse;
    ref?: (node: any) => void;
}
export default function curious(WrappedComponent: React.ComponentType<CuriousComponent>): React.ComponentType<{}>;
