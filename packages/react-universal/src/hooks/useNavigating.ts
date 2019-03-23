import React from "react";
import useCuri from "./useCuri";

import { CancelActiveNavigation } from "@curi/router";

export default function useNavigating() {
  const { router } = useCuri();
  const [cancel, set_cancel] = React.useState(undefined);
  const [removed, set_removed] = React.useState(false);

  React.useEffect(() => {
    return () => {
      set_removed(true);
    };
  }, []);

  React.useEffect(() => {
    return router.cancel((callback: CancelActiveNavigation) => {
      if (!removed) {
        set_cancel(() => callback);
      }
    });
  }, []);
  return cancel;
}
