import React from "react";
import { context } from "../Context";

import { Emitted } from "@curi/router";

export default function useCuri() {
  if (!React.useContext) {
    throw new Error(
      `You are attempting to use React hooks with a version of React that does not support them (${
        React.version
      }).`
    );
  }
  return React.useContext<Emitted>(context);
}
