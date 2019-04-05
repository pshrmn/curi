import React from "react";
import { CuriRouter } from "@curi/types";
export interface RouterProps {
    children: React.ReactNode;
}
export default function create_router_component(router: CuriRouter): React.FunctionComponent<RouterProps>;
