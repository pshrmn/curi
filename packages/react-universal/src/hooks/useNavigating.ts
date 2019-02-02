import React from "react";
import useCuri from "./useCuri";

import { CancelActiveNavigation } from "@curi/router";

export default function useNavigating() {
  const { router } = useCuri();
  const [cancel, setCancel] = React.useState(undefined);
  const [removed, setRemoved] = React.useState(false);

  React.useEffect(() => {
    return () => {
      setRemoved(true);
    };
  }, []);

  React.useEffect(() => {
    return router.cancel((cancelFn: CancelActiveNavigation) => {
      if (!removed) {
        setCancel(() => cancelFn);
      }
    });
  }, []);
  return cancel;
}
