import React from "react";

let Code = ({ children, className = "" }) => {
  return (
    <code
      className={`${className} p-1 rounded whitespace-normal background-white text-purple`}
      style={{ textShadow: "none" }}
    >
      {children}
    </code>
  );
};

export let InlineJS = ({ children, className }) => (
  <Code className={className}>{children}</Code>
);

export let InlineComponent = ({ children, className }) => (
  <Code className={className}>&lt;{children}&gt;</Code>
);
