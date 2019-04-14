import React from "react";
import useRouter from "./useRouter";
import { stringifyFlatObject } from "../utils";

import { RouteLocation } from "@curi/types";

export default function useLocation(props: RouteLocation) {
  const router = useRouter();
  const pathname = React.useMemo(() => {
    return props.name ? router.route.pathname(props.name, props.params) : "";
  }, [props.name, stringifyFlatObject(props.params)]);

  return {
    pathname,
    hash: props.hash,
    query: props.query,
    state: props.state
  };
}
