import React from "react";

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
              style={{
                cursor: "pointer",
                fontSize: 24,
                fontFamily: '"Zilla Slab", serif',
                textAlign: "left",
                width: "100%",
                background: "none",
                border: 0,
                padding: 0
              }}
            >
              {title}
              <div style={{ float: "right" }}>{collapsed ? "+" : "-"}</div>
            </button>
          </div>
          {collapsed ? null : children}
        </li>
      </ul>
    );
  }
}
