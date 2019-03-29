import useCuri from "./useCuri";
import useLocation from "./useLocation";

import { RouteLocation } from "@curi/router";

export default function useHref(props: RouteLocation): string {
  const location = useLocation(props);
  const { router } = useCuri();
  return router.history.href(location);
}
