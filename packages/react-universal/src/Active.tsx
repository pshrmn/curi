import useCuri from "./hooks/useCuri";
import useActive from "./hooks/useActive";

import { ReactNode } from "react";
import { Response } from "@curi/router";

import { ActiveHookProps } from "./hooks/useActive";

export interface ActiveProps extends ActiveHookProps {
  children(active: boolean, response?: Response): ReactNode;
}

export default function Active(props: ActiveProps): ReactNode {
  const { response } = useCuri();
  const active = useActive({
    name: props.name,
    params: props.params,
    partial: props.partial
  });
  return props.children(active, response);
}
