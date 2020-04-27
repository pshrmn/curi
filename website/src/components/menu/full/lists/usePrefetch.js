import React from "react";
import { useRouter } from "@curi/react-dom";
import { prefetch } from "@curi/interactions";

let usePrefetch = (routes, active) => {
  let router = useRouter();
  let hasPrefetched = React.useRef(false);
  React.useEffect(() => {
    if (active && !hasPrefetched.current) {
      hasPrefetched.current = true;
      routes.forEach(({ name, params }) => {
        let route = router.route(name);
        prefetch(route, {
          match: { params }
        });
      });
    }
  }, [active]);
};

export default usePrefetch;
