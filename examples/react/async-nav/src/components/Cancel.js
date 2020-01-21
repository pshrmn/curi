import React from "react";
import { useNavigating } from "@curi/react-dom";

export default function Cancel() {
  let cancel = useNavigating();
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
