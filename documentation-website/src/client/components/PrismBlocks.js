import React from "react";
import PrismCode from "./PrismCode";

export const InlineJS = ({ children }) => (
  <PrismCode className="language-javascript">{children}</PrismCode>
);

export const InlineComponent = ({ children }) => (
  <PrismCode className="language-jsx">&lt;{children}&gt;</PrismCode>
);

export const PrismBlock = ({ lang, children, ...rest }) => (
  <pre {...rest}>
    <PrismCode className={`language-${lang}`}>{children}</PrismCode>
  </pre>
);
