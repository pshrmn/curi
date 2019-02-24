import React from "react";
import useCuri from "./useCuri";

import { ConfirmationFunction } from "@hickory/root";

export default function useBlock<Q>(
  active: boolean,
  fn: ConfirmationFunction<Q>
) {
  const { router } = useCuri();
  React.useEffect(() => {
    if (active) {
      router.history.confirmWith(fn);
      return () => {
        router.history.removeConfirmation();
      };
    }
  }, [active, fn]);
}
