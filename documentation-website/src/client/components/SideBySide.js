import React from "react";
import { PrismBlock } from "./PrismBlocks";

const SideBySide = ({ children }) => (
  <div className="side-by-side">{children}</div>
);

const Explanation = ({ children }) => (
  <div className="explanation">{children}</div>
);

const CodeBlock = ({ children, lang = "javascript" }) => (
  <div className="code-block">
    <PrismBlock lang={lang}>{children}</PrismBlock>
  </div>
);

export { SideBySide, Explanation, CodeBlock };
