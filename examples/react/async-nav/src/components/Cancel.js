import React from "react";
import { useNavigating } from "@curi/react-dom";

export default function Cancel() {
  const cancel = useNavigating();
  return cancel ? (
    <button
      onClick={() => {
        cancel();
      }}
    >
      cancel navigation
    </button>
  ) : null;
}
