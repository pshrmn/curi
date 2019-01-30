import React from "react";
import styled from "@emotion/styled";

import { color } from "../../constants/styles";

const StyledCode = styled("code")`
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;

  background: ${color.white};
  color: ${color.purple};
  text-shadow: none;
  white-space: wrap;

  .token {
    color: ${color.purple};
  }
`;

export const InlineJS = ({ children }) => (
  <StyledCode className="inline-code">{children}</StyledCode>
);

export const InlineComponent = ({ children }) => (
  <StyledCode className="inline-code">&lt;{children}&gt;</StyledCode>
);
