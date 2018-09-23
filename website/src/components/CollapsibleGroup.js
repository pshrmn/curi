import React from "react";

function Down() {
  return (
    <svg
      width="25"
      height="15"
      viewBox="0 0 25 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2,5 l5,5 l5,-5" fill="none" stroke="black" strokeWidth={3} />
    </svg>
  );
}

function Up() {
  return (
    <svg
      width="25"
      height="15"
      viewBox="0 0 25 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2,10 l5,-5 l5,5" fill="none" stroke="black" strokeWidth={3} />
    </svg>
  );
}

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
