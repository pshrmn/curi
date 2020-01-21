import React from "react";
import styled from "@emotion/styled";

import { Up, Down } from "../../svg";
import { color, font } from "../../../constants/styles";

let StyledList = styled("ul")`
  a {
    color: ${color.purple};
  }

  ul {
    margin-left: 10px;
  }

  > li {
    margin-bottom: 15px;
  }
`;

let StyledButton = styled("button")`
  cursor: pointer;
  font-size: 24px;
  font-family: ${font.serif};
  text-align: left;
  width: 100%;
  background: none;
  border: 0;
  padding: 0;
  color: ${color.purple};
`;

export default function CollapsibleGroup(props) {
  let [collapsed, setCollapsed] = React.useState(props.initial || false);

  let { title, children } = props;
  return (
    <StyledList>
      <li>
        <StyledButton
          onClick={e => {
            setCollapsed(!collapsed);
          }}
          title="Toggle group visibility"
        >
          {collapsed ? <Down /> : <Up />}
          {title}
        </StyledButton>
        {collapsed ? null : children}
      </li>
    </StyledList>
  );
}
