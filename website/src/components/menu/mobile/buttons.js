import React from "react";
import styled from "@emotion/styled";

import { color, screen, font } from "../../../constants/styles";

let StyledMenuButton = styled("button")`
  height: 40px;
  border: 0;
  font-size: 1em;
  font-family: ${font.serif};
  flex: 1;
  background: ${color.buttonGreen};
  &.active {
    background: ${color.buttonRed};
  }

  @media only screen and (min-width: ${screen.medium}) {
    display: none;
  }
`;

export function MenuButton(props) {
  let classNames = [props.active && "active", "main"]
    .filter(c => c !== undefined)
    .join(" ");

  return (
    <StyledMenuButton
      onClick={() => {
        props.toggle();
      }}
      className={classNames}
    >
      {props.active ? "Hide" : "Menu"}
    </StyledMenuButton>
  );
}
