import React from "react";
import { ReactNode } from "react";
import { CancelActiveNavigation } from "@curi/router";
export interface NavigatingProps {
    children(cancel: CancelActiveNavigation | void): ReactNode;
}
export default function Navigating(props: NavigatingProps): React.ReactElement<any>;
