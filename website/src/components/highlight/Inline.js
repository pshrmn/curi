import React from "react";

let StyledCode = ({ children, className = "", ...rest }) => {
  return (
    <code
      {...rest}
      className={`${className} p-1 rounded whitespace-normal background-white text-purple`}
      style={{ textShadow: "none" }}
    >
      {children}
    </code>
  );
};

export let InlineJS = ({ children }) => (
  <StyledCode className="inline-code">{children}</StyledCode>
);

export let InlineComponent = ({ children }) => (
  <StyledCode className="inline-code">&lt;{children}&gt;</StyledCode>
);
