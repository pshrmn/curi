import React from "react";
import { Consumer } from "./Context";

import { Emitted } from "@curi/core";

export interface CuriousProps {
  children: (props: Emitted) => React.ReactNode;
}

const Curious = (props: CuriousProps) => <Consumer {...props} />;

export default Curious;
