import React from "react";
import { CuriRouter } from "@curi/types";
export interface RouterProps {
    children: React.ReactNode;
}
export default function createRouterComponent(router: CuriRouter): React.FunctionComponent<RouterProps>;
