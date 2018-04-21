import React from "react";
import { ReactElement, ReactNode } from "react";
import invariant from "invariant";
import { Curious } from "./Context";

import { CuriRouter, Response } from "@curi/core";
import { HickoryLocation } from "@hickory/root";

export interface ActiveProps {
  children(active: boolean, response?: Response): ReactNode;
  name: string;
  params?: object;
  partial?: boolean;
}

const Active = (props: ActiveProps): ReactNode => (
  <Curious>
    {({ router, response }) => {
      invariant(
        router.route.active,
        'You are attempting to use the "active" prop, but have not included the "active" ' +
          "route interaction (@curi/route-active) in your Curi router."
      );

      return props.children(
        router.route.active(props.name, response, props.params, props.partial),
        response
      );
    }}
  </Curious>
);

export default Active;
