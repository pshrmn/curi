import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import { color } from "../constants/styles";

let noteCSS = css`
  padding: 10px 5px;
  margin: 5px 0;
  border: 1px solid ${color.borderGray};

  p:last-child {
    margin-bottom: 0;
  }
`;

let StyledNote = styled("aside")`
  ${noteCSS}

  background: ${color.gray};

  .inline-code {
    background: ${color.white} !important;
  }
`;

let StyledWarning = styled("aside")`
  ${noteCSS}

  background: ${color.lightOrange};
  border-color: ${color.brightOrange};

  .inline-code {
    background: ${color.orange} !important;
  }
`;

export let Note = ({ children }) => (
  <StyledNote>
    <strong>Note:</strong> {children}
  </StyledNote>
);

export let Warning = ({ children }) => (
  <StyledWarning>
    <strong>Warning:</strong> {children}
  </StyledWarning>
);
