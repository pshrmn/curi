/// <reference types="react" />
import React from "react";
import { CuriRouter } from "@curi/core";
import { CuriRenderFn } from "./interface";
export interface ResponsiveProps {
    router: CuriRouter;
    render: CuriRenderFn;
}
declare const ResponsiveBase: React.StatelessComponent<ResponsiveProps>;
export default ResponsiveBase;
