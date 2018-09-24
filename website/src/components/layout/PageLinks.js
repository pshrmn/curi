import React from "react";

import "../../scss/page-links.scss";

export default class PageLinks extends React.Component {
  state = { visible: false };

  toggleLinks = () => {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  };

  hideLinks = () => {
    this.setState(prevState => ({
      visible: false
    }));
  };

  render() {
    const { visible } = this.state;
    return (
      <div className="page-links">
        <button type="button" className="toggler" onClick={this.toggleLinks}>
          {visible ? "Hide" : "Menu"}
        </button>
        <div className={visible ? "visible children" : "children"}>
          {typeof this.props.children === "function"
            ? this.props.children(this.hideLinks)
            : this.props.children}
        </div>
      </div>
    );
  }
}
