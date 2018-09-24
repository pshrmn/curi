import React from "react";

import "../../scss/content.scss";

export default function Content({ children }) {
  return (
    <div className="content" style={{ outline: "none" }}>
      {children}
    </div>
  );
}
