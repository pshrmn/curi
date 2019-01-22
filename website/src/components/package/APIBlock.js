import React from "react";
import styled from "@emotion/styled";

import { Section } from "../layout/Sections";

const StyledAPIBlock = styled(Section)`
  .section {
    padding-left: 10px;
    margin-bottom: 5px;
  }
`;

export default function APIBlock({ children }) {
  return (
    <StyledAPIBlock title="API" id="API">
      {children}
    </StyledAPIBlock>
  );
}
