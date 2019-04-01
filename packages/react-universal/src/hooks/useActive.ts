import useCuri from "./useCuri";

import { SessionLocation } from "@hickory/root";
import { Params } from "@curi/types";

export type LocationCheck = (l: SessionLocation) => boolean;

export interface ActiveHookProps {
  name: string;
  params?: Params;
  partial?: boolean;
  locationCheck?: LocationCheck;
}

export default function useActive(props: ActiveHookProps) {
  const { router, response } = useCuri();
  if (process.env.NODE_ENV !== "production") {
    if (!router.route.active) {
      throw new Error(
        `You are attempting to use the "active" route interaction, but have not included it in your Curi router.

import curi from "@curi/router";
import active from "@curi/route-active";

const router = create_router(history, routes, {
  route: [active()]
});`
      );
    }
  }
  return router.route.active(props.name, response, {
    params: props.params,
    partial: props.partial,
    location_check: props.locationCheck
  });
}
