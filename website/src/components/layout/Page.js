import React from "react";
import styled from "@emotion/styled";

import { screen } from "../../constants/styles";

const StyledPage = styled("div")`
  position: relative;

  @media only screen and (min-width: ${screen.medium}) {
    padding-top: 15px;
    display: flex;
    flex-flow: row nowrap;
  }
`;

export default StyledPage;
