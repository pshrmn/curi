import React from "react";
import styled from "@emotion/styled";

import { color } from "../../../../constants/styles";

let StyledContainer = styled("div")`
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

    &.active {
      font-weight: bold;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

let FlexContainer = styled("ul")`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;

  background ${color.lightBlue};

  > div {
    margin: 0 25px;
  }
`;

let Background = styled("div")`
  background: rgba(0.1, 0.1, 0.1, 0.5);
  width: 100vw;
  height: 100vh;

  cursor: pointer;
`;

export default function Container({ hidden, children }) {
  return (
    <StyledContainer className={hidden ? "" : "active"}>
      <FlexContainer>{children}</FlexContainer>
    </StyledContainer>
  );
}
