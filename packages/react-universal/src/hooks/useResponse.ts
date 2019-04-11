import React from "react";
import { emitted_context } from "../Context";

import { Emitted } from "@curi/types";

export default function useResponse() {
  return React.useContext<Emitted>(emitted_context);
}
