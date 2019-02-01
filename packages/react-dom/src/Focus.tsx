import React from "react";

import useNavigationFocus from "./hooks/useNavigationFocus";

import { ReactNode, Ref } from "react";
import { FocusHookProps } from "./hooks/useNavigationFocus";

export interface FocusProps extends FocusHookProps {
  children(ref: Ref<any>): ReactNode;
}

const Focus = (props: FocusProps) => {
  const ref = React.useRef(null);
  useNavigationFocus(ref, props);
  return props.children(ref);
};

export default Focus;
