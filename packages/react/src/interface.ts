import React from "react";
import { Emitted } from "@curi/core";

export interface CuriContext {
  curi: Emitted;
}

export type CuriRenderFn = (props: Emitted) => React.ReactElement<any>;
