import React from "react";
import { responseContext } from "../Context";

import { Emitted } from "@curi/types";

export default function useResponse() {
  return React.useContext<Emitted>(responseContext);
}
