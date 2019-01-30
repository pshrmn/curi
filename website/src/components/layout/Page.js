import React from "react";
import styled from "@emotion/styled";

import { screen } from "../../constants/styles";

const StyledPage = styled("div")`
  position: relative;

  @media only screen and (min-width: ${screen.medium}) {
    width: ${screen.medium};
    margin: 0 auto;
  }
`;

export default StyledPage;
