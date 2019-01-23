import React from "react";
import PrismCode from "../highlight/PrismCode";
import styled from "@emotion/styled";

import { screen } from "../../constants/styles";

const StyledCodeBlock = styled("div")`
  width: 100%;
  margin: 0 0 25px;
  font-size: 0.8em;

  pre {
    white-space: pre-wrap;
    height: 100%;
    vertical-align: top;
  }

  @media only screen and (min-width: ${screen.medium}) {
    font-size: 1em;
    code {
      min-width: 200px;
    }
  }
`;

const StyledExplanation = styled("div")`
  width: 100%;

  p {
    margin: 0 0 25px;
    font-size: 0.8em;
  }

  @media only screen and (min-width: ${screen.medium}) {
    p {
      font-size: 1em;
    }
  }
`;

const CodeBlock = ({ children, lang = "javascript", ...rest }) => (
  <StyledCodeBlock>
    <pre {...rest}>
      <PrismCode component="code" className={`language-${lang}`}>
        {children}
      </PrismCode>
    </pre>
  </StyledCodeBlock>
);

export { StyledExplanation as Explanation, CodeBlock };
