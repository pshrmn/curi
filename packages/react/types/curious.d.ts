/// <reference types="react" />
import React from 'react';
import { CuriConfig, Response } from '@curi/core';
export interface CuriousProps {
    internalRef?: (node: any) => void;
    children?: any;
}
export interface CuriousComponent {
    curi?: CuriConfig;
    response?: Response;
    ref?: (node: any) => void;
}
export default function curious(WrappedComponent: React.ComponentType<CuriousComponent>): React.ComponentType<{}>;
