import React from "react";
import { useRouter } from "@curi/react-dom";
import { prefetch } from "@curi/interactions";

export default function usePrefetch(routes, active) {
  const router = useRouter();
  const hasPrefetched = React.useRef(false);
  React.useEffect(() => {
    if (active && !hasPrefetched.current) {
      hasPrefetched.current = true;
      routes.forEach(({ name, params }) => {
        const route = router.route(name);
        prefetch(route, {
          match: { params }
        });
      });
    }
  }, [active]);
}
