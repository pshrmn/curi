import React from "react";
import useRouter from "./useRouter";

export default function useNavigating() {
  let router = useRouter();
  let [cancel, setCancel] = React.useState(undefined);

  React.useEffect(() => {
    let removed = false;
    let stop = router.cancel(callback => {
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
