import React from "react";
import styled from "@emotion/styled";

import { color } from "../../../../constants/styles";

const StyledContainer = styled("div")`
  display: none;

  &.active {
    display: block;
  }

  position: absolute;
  left: 0;
  width: 100vw;
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

  background ${color.lightBlue};
`;

const Background = styled("div")`
  background: rgba(0.1, 0.1, 0.1, 0.5);
  width: 100vw;
  height: 100vh;

  cursor: pointer;
`;

export default function Container({ active, close, children }) {
  return (
    <StyledContainer className={active ? "active" : ""}>
      <FlexContainer>{children}</FlexContainer>
      <Background onClick={close} />
    </StyledContainer>
  );
}
