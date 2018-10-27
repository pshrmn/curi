import React from "react";
import useCuri from "./useCuri";

import { ConfirmationFunction } from "@hickory/root";

export default function useBlock(active: boolean, fn: ConfirmationFunction) {
  const { router } = useCuri();
  React.useLayoutEffect(
    () => {
      if (active) {
        router.history.confirmWith(fn);
        return () => {
          router.history.removeConfirmation();
        };
      }
    },
    [active, fn]
  );
}
