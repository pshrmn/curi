import React from "react";
import { responseContext } from "../Context";

import { ResponseAndNav } from "@curi/types";

export default function useResponse() {
  return React.useContext<ResponseAndNav>(responseContext);
}
