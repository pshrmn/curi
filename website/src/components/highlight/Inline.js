import React from "react";
import PrismCode from "./PrismCode";

import "../../scss/inline.scss";

export const InlineJS = ({ children }) => (
  <PrismCode className="inline-code language-javascript">{children}</PrismCode>
);

export const InlineComponent = ({ children }) => (
  <PrismCode className="inline-code language-jsx">&lt;{children}&gt;</PrismCode>
);
