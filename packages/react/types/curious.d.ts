/// <reference types="react" />
import React from 'react';
import { CuriRouter, Response } from '@curi/core';
export interface CuriousProps {
    internalRef?: (node: any) => void;
    children?: any;
}
export interface CuriousComponent {
    router?: CuriRouter;
    response?: Response;
    ref?: (node: any) => void;
}
export default function curious(WrappedComponent: React.ComponentType<CuriousComponent>): React.ComponentType<{}>;
