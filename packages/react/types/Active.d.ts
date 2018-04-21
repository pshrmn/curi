/// <reference types="react" />
import React from "react";
import { ReactNode } from "react";
export interface ActiveProps {
    children(active: boolean): ReactNode;
    name: string;
    params?: object;
    partial?: boolean;
}
declare const Active: (props: ActiveProps) => React.ReactNode;
export default Active;
