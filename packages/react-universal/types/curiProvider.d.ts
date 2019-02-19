import React from "react";
import { CuriRouter } from "@curi/router";
export interface RouterProps {
    children: React.ReactNode;
    suspend?: boolean;
}
export default function curiProvider(router: CuriRouter): React.FunctionComponent<RouterProps>;
