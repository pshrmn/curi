import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import { color, screen, font } from "../../../constants/styles";

const buttonDiameter = 75;

const buttonStyles = css`
  width: ${buttonDiameter}px;
  height: ${buttonDiameter}px;
  border-radius: 40px;
  border: 0;
  margin-top 10px;
  font-size: 1em;
  font-family: ${font.serif};

  @media only screen and (min-width: ${screen.medium}) {
    display: none;
  }
`;

const StyledButton = styled("button")`
  ${buttonStyles}
  background: ${color.borderBlue};
`;

const StyledMiniButton = styled("button")`
  ${buttonStyles}
  background: ${color.borderGray};

  &.active {
    background: ${color.buttonGreen};
  }
`;

export function MenuToggleButton(props) {
  return (
    <StyledButton
      type="button"
      className="toggler"
      onClick={props.toggleMenuVisibility}
    >
      {props.visible ? "Hide" : "Menu"}
    </StyledButton>
  );
}

export function MainMenuButton(props) {
  const classNames = [
    props.visible && "visible",
    props.activeMenu === "main" && "active",
    "main"
  ]
    .filter(c => c !== undefined)
    .join(" ");

  return (
    <StyledMiniButton
      hidden={!props.visible}
      onClick={() => {
        props.toggleMenuType("main");
      }}
      className={classNames}
    >
      Main
    </StyledMiniButton>
  );
}

export function PageMenuButton(props) {
  const classNames = [
    props.visible && "visible",
    props.activeMenu === "page" && "active",
    "page"
  ]
    .filter(c => c !== undefined)
    .join(" ");

  return (
    <StyledMiniButton
      hidden={!props.visible}
      onClick={() => {
        props.toggleMenuType("page");
      }}
      className={classNames}
    >
      Page
    </StyledMiniButton>
  );
}
