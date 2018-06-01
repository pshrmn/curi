import React from "react";
import { Focus } from "@curi/react";

import "../scss/content.scss";

export default ({ children }) => (
  <Focus>
    {ref => (
      <div
        className="content"
        tabIndex={-1}
        ref={ref}
        style={{ outline: "none" }}
      >
        {children}
      </div>
    )}
  </Focus>
);
