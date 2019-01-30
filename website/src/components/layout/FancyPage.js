import React from "react";
import styled from "@emotion/styled";

import Page from "./TwoColumnPage";
import { screen, color } from "../../constants/styles";

const StyledPage = styled(Page)`
  @media only screen and (min-width: ${screen.medium}) {
    max-width: 100vw;
  }
`;

const StyledBase = styled("div")`
  @media only screen and (min-width: ${screen.medium}) {
    margin-left: 275px;
  }
`;

const StyledMenu = styled("div")`
  display: none;

  @media only screen and (min-width: ${screen.medium}) {
    background: ${color.lightGray};
    display: block;
    position: fixed;
    top: 50px;
    bottom: 0px;
    overflow: auto;

    flex: 0 0;
    order: -1;
    padding: 25px;
    margin-right: 25px;
  }
`;

export default function FancyPage({ base, menu }) {
  return (
    <StyledPage>
      <StyledBase>{base}</StyledBase>
      <StyledMenu>{menu}</StyledMenu>
    </StyledPage>
  );
}
