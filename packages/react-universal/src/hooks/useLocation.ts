import React from "react";
import useRouter from "./useRouter";

import { RouteLocation } from "@curi/types";

export default function useLocation(props: RouteLocation) {
  const router = useRouter();
  const pathname = props.name
    ? router.route.pathname(props.name, props.params)
    : "";
  return {
    pathname,
    hash: props.hash,
    query: props.query,
    state: props.state
  };
}
