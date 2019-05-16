import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import { color, screen, font } from "../../../constants/styles";

const buttonStyles = css`
  height: 50px;
  border: 0;
  font-size: 1em;
  font-family: ${font.serif};
  flex: 1;

  &.active {
    background: ${color.buttonRed};
  }

  @media only screen and (min-width: ${screen.medium}) {
    display: none;
  }
`;

const StyledMainButton = styled("button")`
  ${buttonStyles}

  background: ${color.buttonGreen};
`;

const StyledPageButton = styled("button")`
  ${buttonStyles}

  background: ${color.buttonBlue};
`;

export function MainMenuButton(props) {
  const classNames = [props.activeMenu === "main" && "active", "main"]
    .filter(c => c !== undefined)
    .join(" ");

  return (
    <StyledMainButton
      onClick={() => {
        props.toggleMenuType("main");
      }}
      className={classNames}
    >
      Main Menu
    </StyledMainButton>
  );
}

export function PageMenuButton(props) {
  const classNames = [props.activeMenu === "page" && "active", "page"]
    .filter(c => c !== undefined)
    .join(" ");

  return (
    <StyledPageButton
      onClick={() => {
        props.toggleMenuType("page");
      }}
      className={classNames}
    >
      Page Menu
    </StyledPageButton>
  );
}
