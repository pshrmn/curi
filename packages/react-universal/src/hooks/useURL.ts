import useRouter from "./useRouter";

import { RouteLocation } from "@curi/types";

export default function useURL(props: RouteLocation): string {
  const router = useRouter();
  return router.url(props);
}
