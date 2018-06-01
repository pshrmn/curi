/// <reference types="react" />
import { ReactNode } from "react";
export interface FocusProps {
    children: ReactNode;
    component?: string;
}
declare const Focus: (props: FocusProps) => JSX.Element;
export default Focus;
