/// <reference types="react" />
import { ReactNode, Ref } from "react";
export interface FocusProps {
    children(ref: Ref<any>): ReactNode;
}
declare const Focus: (props: FocusProps) => JSX.Element;
export default Focus;
