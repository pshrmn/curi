import React from "react";
import { ReactElement } from "react";
import invariant from "invariant";
import { Curious } from "./Context";

import { CuriRouter, Response } from "@curi/core";
import { HickoryLocation } from "@hickory/root";

export type ActiveChildren = (active: boolean) => ReactElement<any>;

export interface ActiveProps {
  children: ActiveChildren;
  name: string;
  params?: object;
  partial?: boolean;
}

const Active = (props: ActiveProps): React.ReactElement<any> => (
  <Curious>
    {({ router, response }) => {
      invariant(
        router.route.active,
        'You are attempting to use the "active" prop, but have not included the "active" ' +
          "route interaction (@curi/route-active) in your Curi router."
      );

      return props.children(
        router.route.active(props.name, response, props.params, props.partial)
      );
    }}
  </Curious>
);

export default Active;
