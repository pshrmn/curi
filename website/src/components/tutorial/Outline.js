import React from "react";
import styled from "@emotion/styled";

import { color } from "../../constants/styles";

const StyledDiv = styled("div")`
  border: 1px solid ${color.borderBlue};
  padding: 10px;
  margin: 5px 0;
  background: ${color.lightBlue};

  p {
    margin: 0;
  }

  .inline-code {
    background: ${color.blue} !important;
  }
`;

export default function Outline({ children }) {
  return (
    <StyledDiv>
      <p>
        <strong>We will be doing the following:</strong>
      </p>
      {children}
    </StyledDiv>
  );
}