import React from "react";
import styled from "@emotion/styled";

import { screen, color } from "../../constants/styles";

const StyledMain = styled("main")`
  width: 100vw;
  max-width: 100%;
  padding: 10px 10px 0;
  margin-bottom: 45px;

  a {
    color: ${color.purple};
  }

  @media only screen and (min-width: ${screen.medium}) {
    padding: 50px 0 0;
    margin-bottom: 0;
  }
`;

export default StyledMain;