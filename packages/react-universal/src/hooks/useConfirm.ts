import React from "react";
import useRouter from "./useRouter";

import { ConfirmationFunction } from "@hickory/root";

export default function useConfirm(fn?: ConfirmationFunction) {
  let router = useRouter();
  React.useEffect(() => {
    router.history.confirm(fn);

    return () => {
      router.history.confirm();
    };
  }, [fn]);
}
