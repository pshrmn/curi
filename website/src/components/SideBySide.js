import React from "react";
import { PrismBlock } from "./PrismBlocks";

import "../scss/sidebyside.scss";

const SideBySide = ({ children }) => (
  <div className="side-by-side">{children}</div>
);

const Explanation = ({ children }) => (
  <div className="explanation">{children}</div>
);

const CodeBlock = ({ lang = "javascript", ...rest }) => (
  <div className="code-block">
    <PrismBlock lang={lang} {...rest} />
  </div>
);

export { SideBySide, Explanation, CodeBlock };
