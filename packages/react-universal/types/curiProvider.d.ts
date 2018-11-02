import React from "react";
import { CuriRouter, Emitted } from "@curi/router";
export declare type CuriRenderFn = (props: Emitted) => React.ReactNode;
export interface RouterProps {
    children: CuriRenderFn;
}
export default function curiProvider(router: CuriRouter): React.ComponentType<RouterProps>;
