import React from "react";

export default function ExamplePage({ title, children }) {
  return (
    <React.Fragment>
      <h1 tabIndex={-1} style={{ outline: "none" }}>
        {title}
      </h1>
      {children}
    </React.Fragment>
  );
}
