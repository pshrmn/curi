import React from "react";
import { ReactNode, Ref } from "react";
export interface FocusProps {
    children(ref: Ref<any>): ReactNode;
    preventScroll?: boolean;
    preserve?: boolean;
}
export default function Focus(props: FocusProps): React.ReactElement<any>;
