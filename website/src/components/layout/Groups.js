import React from "react";
import PrismCode from "../highlight/PrismCode";

let CodeBlock = ({ children, lang = "javascript", ...rest }) => {
  return (
    <figure className="max-w-4xl m-0 mb-4">
      <pre {...rest} className="align-top h-full whitespace-pre-wrap">
        <PrismCode component="code" className={`language-${lang}`}>
          {children}
        </PrismCode>
      </pre>
    </figure>
  );
};

export { CodeBlock };
