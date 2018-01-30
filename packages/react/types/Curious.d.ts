/// <reference types="react" />
import React from "react";
import { Emitted } from "@curi/core";
export interface CuriousProps {
    children: (props: Emitted) => React.ReactNode;
}
declare const Curious: (props: CuriousProps) => JSX.Element;
export default Curious;
