import React from "react";
import { routerContext } from "../Context";

import { CuriRouter } from "@curi/types";

export default function useRouter() {
  return React.useContext<CuriRouter>(routerContext);
}
