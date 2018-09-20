import React from "react";
import PrismCode from "./PrismCode";

import "../scss/prismBlocks.scss";

export const InlineJS = ({ children }) => (
  <PrismCode className="inline-code language-javascript">{children}</PrismCode>
);

export const InlineComponent = ({ children }) => (
  <PrismCode className="inline-code language-jsx">&lt;{children}&gt;</PrismCode>
);

export const PrismBlock = ({ lang, children, ...rest }) => (
  <pre {...rest}>
    <PrismCode className={`language-${lang}`}>{children}</PrismCode>
  </pre>
);
