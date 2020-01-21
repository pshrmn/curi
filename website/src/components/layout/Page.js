import React from "react";
import styled from "@emotion/styled";

import { screen } from "../../constants/styles";

let StyledPage = styled("div")`
  position: relative;

  @media only screen and (min-width: ${screen.medium}) {
    padding: 25px 0 0 25px;
  }
`;

export default StyledPage;
