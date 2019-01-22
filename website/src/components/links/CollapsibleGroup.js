import React from "react";
import styled from "@emotion/styled";

import { Up, Down } from "../svg";
import { color, font } from "../../constants/styles";

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
  state = { collapsed: false };

  toggle = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  render() {
    const { title, children } = this.props;
    const { collapsed } = this.state;
    return (
      <ul className="link-list">
        <li className="link-group">
          <div>
            <StyledButton onClick={this.toggle} title="Toggle group visibility">
              {collapsed ? <Down /> : <Up />}
              {title}
            </StyledButton>
          </div>
          {collapsed ? null : children}
        </li>
      </ul>
    );
  }
}
