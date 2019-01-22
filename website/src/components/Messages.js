import React from "react";
import styled from "@emotion/styled";

import { color } from "../constants/styles";

const StyledNote = styled("div")`
  padding: 10px 5px;
  margin: 5px 0;

  .aside & {
    background: ${color.white};
  }

  background: ${color.gray};
  border: 1px solid ${color.borderGray};

  .inline-code {
    background: ${color.white} !important;
  }
`;

const StyledWarning = styled("div")`
  padding: 10px 5px;
  margin: 5px 0;

  background: ${color.lightOrange};
  border: 1px solid ${color.brightOrange};

  .inline-code {
    background: ${color.orange} !important;
  }
`;

export const Note = ({ children }) => (
  <StyledNote>
    <strong>Note:</strong> {children}
  </StyledNote>
);

export const Warning = ({ children }) => (
  <StyledWarning>
    <strong>Warning:</strong> {children}
  </StyledWarning>
);
