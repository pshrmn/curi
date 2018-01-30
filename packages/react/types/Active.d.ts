/// <reference types="react" />
import React from "react";
import { ReactElement } from "react";
import { CuriRouter, Response } from "@curi/core";
import { HickoryLocation } from "@hickory/root";
export interface ActiveProps {
    children: ReactElement<any>;
    name: string;
    params?: object;
    partial?: boolean;
    merge(props: object): object;
    extra?(l: HickoryLocation, d: object): boolean;
    details?: object;
}
export interface BaseActiveProps extends ActiveProps {
    router: CuriRouter;
    response: Response;
}
declare const Active: (props: ActiveProps) => React.ReactElement<any>;
export default Active;
