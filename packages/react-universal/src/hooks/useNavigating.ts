import React from "react";
import useRouter from "./useRouter";

import { CancelActiveNavigation } from "@curi/types";

export default function useNavigating() {
  const router = useRouter();
  const [cancel, setCancel] = React.useState(undefined);

  React.useEffect(() => {
    let removed = false;
    const stop = router.cancel((callback: CancelActiveNavigation) => {
      if (!removed) {
        setCancel(() => callback);
      }
    });

    return () => {
      removed = true;
      stop();
    };
  }, []);
  return cancel;
}
