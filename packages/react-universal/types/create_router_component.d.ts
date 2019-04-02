import React from "react";
import { CuriRouter } from "@curi/types";
export interface RouterProps {
    children: React.ReactNode;
}
export default function curi_provider(router: CuriRouter): React.FunctionComponent<RouterProps>;
