import React from "react";
import styled from "@emotion/styled";

import { Up, Down } from "../svg";
import { color, font } from "../../constants/styles";

const StyledList = styled("ul")`
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

const StyledButton = styled("button")`
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

export default class CollapsibleGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.initial !== undefined ? props.initial : false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  render() {
    const { title, children } = this.props;
    const { collapsed } = this.state;
    return (
      <StyledList>
        <li>
          <div>
            <StyledButton onClick={this.toggle} title="Toggle group visibility">
              {collapsed ? <Down /> : <Up />}
              {title}
            </StyledButton>
          </div>
          {collapsed ? null : children}
        </li>
      </StyledList>
    );
  }
}
