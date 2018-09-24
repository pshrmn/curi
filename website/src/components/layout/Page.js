import React from "react";

import "../../scss/page.scss";

export default function Page({ children, type = "" }) {
  return <div className={`page ${type}`}>{children}</div>;
}
