import React from "react";
import { Curious } from "./Context";

import { ReactNode } from "react";
import { Response } from "@curi/router";

export interface ActiveProps {
  children(active: boolean, response?: Response): ReactNode;
  name: string;
  params?: object;
  partial?: boolean;
}

export default function(props: ActiveProps): ReactNode {
  return (
    <Curious>
      {({ router, response }) => {
        if (process.env.NODE_ENV !== "production") {
          if (!router.route.active) {
            throw new Error(
              `You are attempting to use the "active" route interaction, but have not included it in your Curi router.

import curi from "@curi/router";
import active from "@curi/route-active";

const router = curi(history, routes, {
  route: [active()]
});`
            );
          }
        }

        return props.children(
          router.route.active(
            props.name,
            response,
            props.params,
            props.partial
          ),
          response
        );
      }}
    </Curious>
  );
}
