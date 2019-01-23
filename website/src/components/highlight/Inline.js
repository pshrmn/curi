import React from "react";
import styled from "@emotion/styled";

import PrismCode from "./PrismCode";
import { color } from "../../constants/styles";

const StyledPrismCode = styled(PrismCode)`
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;
  /*
  * not ideal, but using important so that I don't have to
  * edit the css file provided by prism
  */
  background: ${color.white} !important;
  color: ${color.purple} !important;
  text-shadow: none;
  white-space: wrap;

  .token {
    color: ${color.purple};
  }
`;

export const InlineJS = ({ children }) => (
  <StyledPrismCode className="inline-code language-javascript">
    {children}
  </StyledPrismCode>
);

export const InlineComponent = ({ children }) => (
  <StyledPrismCode className="inline-code language-jsx">
    &lt;{children}&gt;
  </StyledPrismCode>
);
