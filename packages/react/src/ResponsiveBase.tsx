import React from "react";
import CuriBase from "./CuriBase";
import Curious from "./Curious";

import { CuriRouter } from "@curi/core";
import { CuriProps } from "./interface";
import { CuriRenderFn } from "./CuriBase";

export interface ResponsiveProps {
  router: CuriRouter;
  render: CuriRenderFn;
}

const ResponsiveBase: React.StatelessComponent<ResponsiveProps> = (
  props: ResponsiveProps
) => (
  <Curious
    router={props.router}
    render={curiProps => <CuriBase {...curiProps} render={props.render} />}
  />
);

export default ResponsiveBase;
