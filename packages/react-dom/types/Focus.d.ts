import React from "react";
import { ReactNode, Ref } from "react";
import { FocusHookProps } from "./hooks/useNavigationFocus";
export interface FocusProps extends FocusHookProps {
    children(ref: Ref<any>): ReactNode;
}
declare const Focus: (props: FocusProps) => React.ReactNode;
export default Focus;
