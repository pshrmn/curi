import useRouter from "./useRouter";

import { RouteLocation } from "@curi/types";

export default function useURL(props: RouteLocation): string {
  let router = useRouter();
  return router.url(props);
}
