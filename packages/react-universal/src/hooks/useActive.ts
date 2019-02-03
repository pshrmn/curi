import useCuri from "./useCuri";

import { HickoryLocation } from "@hickory/root";
import { Params } from "@curi/router";

export type LocationCheck = (l: HickoryLocation) => boolean;

export interface ActiveHookProps {
  name: string;
  params?: Params;
  partial?: boolean;
  checkLocation?: LocationCheck;
}

export default function useActive(props: ActiveHookProps) {
  const { router, response } = useCuri();
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
  let isActive = router.route.active(
    props.name,
    response,
    props.params,
    props.partial,
    props.checkLocation
  );
  return isActive;
}
