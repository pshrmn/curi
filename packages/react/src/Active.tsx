import React from "react";
import invariant from "invariant";
import { Curious } from "./Context";

import { ReactNode } from "react";
import { Response } from "@curi/core";

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
        `You are attempting to use the "active" route interaction, but have not included it in your Curi router.

import curi from "@curi/core";
import active from "@curi/route-active";

const router = curi(history, routes, {
  route: [active()]
});`
      );

      return props.children(
        router.route.active(props.name, response, props.params, props.partial),
        response
      );
    }}
  </Curious>
);

export default Active;
