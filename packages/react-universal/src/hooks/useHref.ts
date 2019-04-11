import useRouter from "./useRouter";
import useLocation from "./useLocation";

import { RouteLocation } from "@curi/types";

export default function useHref(props: RouteLocation): string {
  const location = useLocation(props);
  const router = useRouter();
  return router.history.href(location);
}
