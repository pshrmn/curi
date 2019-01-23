import React from "react";
import styled from "@emotion/styled";

import { screen } from "../../constants/styles";

const StyledDiv = styled("div")`
  @media only screen and (min-width: ${screen.medium}) {
    order: 2;
    flex: 0 1 800px;
    position: relative;
    padding: 0;
    overflow: hidden;

    outline: none;
  }
`;

export default function Content({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
