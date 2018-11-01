import React from "react";

import { Up, Down } from "../svg";
import "../../scss/collapse.scss";

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
            <button
              onClick={this.toggle}
              title="Toggle group visibility"
              className="collapse-button"
            >
              {collapsed ? <Down /> : <Up />}
              {title}
            </button>
          </div>
          {collapsed ? null : children}
        </li>
      </ul>
    );
  }
}
