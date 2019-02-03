import useCuri from "./hooks/useCuri";
import useActive from "./hooks/useActive";

import { ReactNode } from "react";
import { Response } from "@curi/router";

import { ActiveHookProps, CheckActiveResponse } from "./hooks/useActive";

export interface ActiveProps extends ActiveHookProps {
  responseCheck?: CheckActiveResponse;
  children(active: boolean): ReactNode;
}

export default function Active(props: ActiveProps): ReactNode {
  const active = useActive(
    {
      name: props.name,
      params: props.params,
      partial: props.partial
    },
    props.responseCheck
  );
  return props.children(active);
}
