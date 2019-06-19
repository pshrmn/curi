import React from "react";
import styled from "@emotion/styled";

import { HashSection } from "../layout/Sections";

const StyledAPIBlock = styled(HashSection)`
  .section {
    padding-left: 10px;
    margin-bottom: 5px;
  }
`;

export default function APIBlock({ children }) {
  return (
    <StyledAPIBlock meta={{ title: "API", hash: "API" }} tag="h2">
      {children}
    </StyledAPIBlock>
  );
}
