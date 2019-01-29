import React from "react";
import styled from "@emotion/styled";

import { screen, color } from "../../constants/styles";

const StyledMain = styled("main")`
  width: 100vw;
  padding: 10px 10px 0;
  margin-bottom: 20px;

  a {
    color: ${color.purple};
  }

  @media only screen and (min-width: ${screen.medium}) {
    padding: 50px 0 0;

    > * {
      width: ${screen.medium};
      margin: 0 auto;
    }
  }
`;

export default StyledMain;
