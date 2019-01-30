import React from "react";
import { Link } from "@curi/react-dom";
import styled from "@emotion/styled";

import { color } from "../../constants/styles";

const fancyLink = styled("a")`
  display: inline-block;
  padding: 5px 15px;
  margin: 5px 0;
  min-width: 200px;
  border-radius: 5px;

  font-size: 1.5em;
  text-decoration: none;
  text-align: center;

  background: ${color.blue};
  outline-color: ${color.brightOrange};
`;

export function FancyLink({ forward, ...rest }) {
  return <Link {...rest} anchor={fancyLink} />;
}
