/// <reference types="react" />
import React from "react";
import { ReactType } from "react";
export interface FocusProps extends React.HTMLAttributes<HTMLElement> {
    component?: ReactType;
}
declare const Focus: (props: FocusProps) => JSX.Element;
export default Focus;
