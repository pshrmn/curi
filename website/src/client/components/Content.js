import React from "react";

import "../scss/content.scss";

export default ({ children }) => (
  <div className="content" style={{ outline: "none" }}>
    {children}
  </div>
);
