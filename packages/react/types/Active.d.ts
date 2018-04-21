/// <reference types="react" />
import React from "react";
import { ReactElement } from "react";
import { CuriRouter, Response } from "@curi/core";
export declare type ActiveChildren = (active: boolean) => ReactElement<any>;
export interface ActiveProps {
    children: ActiveChildren;
    name: string;
    params?: object;
    partial?: boolean;
}
export interface BaseActiveProps extends ActiveProps {
    router: CuriRouter;
    response: Response;
}
declare const Active: (props: ActiveProps) => React.ReactElement<any>;
export default Active;
