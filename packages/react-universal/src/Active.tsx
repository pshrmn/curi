import useActive from "./hooks/useActive";

import { ReactNode } from "react";

import { ActiveHookProps } from "./hooks/useActive";

export interface ActiveProps extends ActiveHookProps {
  children(active: boolean): ReactNode;
}

export default function Active(props: ActiveProps): ReactNode {
  const { children, ...rest } = props;
  const active = useActive(rest);
  return props.children(active);
}
