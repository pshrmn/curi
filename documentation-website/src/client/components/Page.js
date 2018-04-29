import React from "react";

// import "../scss/page.scss";

export default ({ children, type }) => (
  <div className={`page ${type}`}>{children}</div>
);
