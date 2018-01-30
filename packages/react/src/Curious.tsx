import React from "react";
import CuriContext from "./Context";

import { Emitted } from "@curi/core";

export interface CuriousProps {
  children: (props: Emitted) => React.ReactNode;
}

const Curious = (props: CuriousProps) => <CuriContext.Consumer {...props} />;

export default Curious;
