import React from "react";
import styled from "@emotion/styled";

import { screen, color } from "../../../constants/styles";

const StyledContainer = styled("div")`
  display: none;

  &.active {
    display: block;
  }

  position: absolute;
  left: 0;
  width: 100vw;
  background ${color.lightBlue};
  color: ${color.purple};
  border-bottom: 2px solid ${color.purple};
  
  a {
    color: ${color.purple};
    text-decoration: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const FlexContainer = styled("div")`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
`;

export default function Container({ active, children, ...rest }) {
  return (
    <StyledContainer {...rest} className={active ? "active" : ""}>
      <FlexContainer>{children}</FlexContainer>
    </StyledContainer>
  );
}
