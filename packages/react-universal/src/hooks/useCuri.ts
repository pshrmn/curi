import React from "react";
import { context } from "../Context";

import { Emitted } from "@curi/types";

export default function useCuri() {
  return React.useContext<Emitted>(context);
}
