import React from "react";
import { router_context } from "../Context";

import { CuriRouter } from "@curi/types";

export default function useRouter() {
  return React.useContext<CuriRouter>(router_context);
}
