import React from "react";
import { response_context } from "../Context";

import { Emitted } from "@curi/types";

export default function useResponse() {
  return React.useContext<Emitted>(response_context);
}
