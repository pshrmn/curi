import { ReactNode } from "react";
import { CancelActiveNavigation } from "@curi/router";
export interface NavigatingProps {
    children(cancel: CancelActiveNavigation | void): ReactNode;
}
declare const Navigating: (props: NavigatingProps) => JSX.Element;
export default Navigating;
