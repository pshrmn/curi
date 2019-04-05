import React from "react";
import useCuri from "./useCuri";

import { CancelActiveNavigation } from "@curi/types";

export default function useNavigating() {
  const { router } = useCuri();
  const [cancel, set_cancel] = React.useState(undefined);
  const removed = React.useRef(false);

  React.useEffect(() => {
    return () => {
      removed.current = true;
    };
  }, []);

  React.useEffect(() => {
    return router.cancel((callback: CancelActiveNavigation) => {
      if (!removed.current) {
        set_cancel(() => callback);
      }
    });
  }, []);
  return cancel;
}
