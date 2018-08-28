import React from "react";
import { ReactNode } from "react";
import { Response } from "@curi/router";
export interface ActiveProps {
    children(active: boolean, response?: Response): ReactNode;
    name: string;
    params?: object;
    partial?: boolean;
}
declare const Active: (props: ActiveProps) => React.ReactNode;
export default Active;
