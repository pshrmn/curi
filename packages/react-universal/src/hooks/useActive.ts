import useResponse from "./useResponse";

import { SessionLocation } from "@hickory/root";
import { Params } from "@curi/types";

export type ValidateComponents = (l: SessionLocation) => boolean;

export interface ActiveHookProps {
  name: string;
  params?: Params;
  partial?: boolean;
  components?: ValidateComponents;
}

export default function useActive(props: ActiveHookProps) {
  const { router, response } = useResponse();
  if (process.env.NODE_ENV !== "production") {
    if (!router.route.active) {
      throw new Error(
        `You are attempting to use the "active" route interaction, but have not included it in your Curi router.

import { createRouter } from "@curi/router";
import active from "@curi/route-active";

const router = createRouter(history, routes, {
  route: [active()]
});`
      );
    }
  }
  return router.route.active(props.name, response, {
    params: props.params,
    partial: props.partial,
    components: props.components
  });
}
