import React from "react";
import { useRouter } from "@curi/react-dom";

export default function usePrefetch(routes, active) {
  const router = useRouter();
  const hasPrefetched = React.useRef(false);
  React.useEffect(() => {
    if (active && !hasPrefetched.current) {
      hasPrefetched.current = true;
      routes.forEach(route => {
        router.route.prefetch(route.name, {
          match: { params: route.params }
        });
      });
    }
  }, [active]);
}
