/// <reference types="react" />
import React from "react";
export interface FocusProps extends React.HTMLAttributes<HTMLElement> {
    component?: string;
}
declare const Focus: (props: FocusProps) => JSX.Element;
export default Focus;
