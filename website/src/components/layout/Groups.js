import React from "react";
import PrismCode from "../highlight/PrismCode";

import "../../scss/explanation.scss";
import "../../scss/codeblock.scss";

const Explanation = ({ children }) => (
  <div className="explanation">{children}</div>
);

const PrismBlock = ({ lang, children, ...rest }) => (
  <pre {...rest}>
    <PrismCode className={`language-${lang}`}>{children}</PrismCode>
  </pre>
);

const CodeBlock = ({ lang = "javascript", ...rest }) => (
  <div className="code-block">
    <PrismBlock lang={lang} {...rest} />
  </div>
);

export { Explanation, CodeBlock };
