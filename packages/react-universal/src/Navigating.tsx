import useNavigating from "./hooks/useNavigating";

import { ReactNode } from "react";
import { CancelActiveNavigation } from "@curi/router";

export interface NavigatingProps {
  children(cancel: CancelActiveNavigation | void): ReactNode;
}

export default function Navigating(props: NavigatingProps): ReactNode {
  const cancel = useNavigating();
  return props.children(cancel);
}
