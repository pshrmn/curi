/// <reference types="react" />
import React from "react";
import { ReactElement } from "react";
export declare type ActiveChildren = (active: boolean) => ReactElement<any>;
export interface ActiveProps {
    children: ActiveChildren;
    name: string;
    params?: object;
    partial?: boolean;
}
declare const Active: (props: ActiveProps) => React.ReactElement<any>;
export default Active;
