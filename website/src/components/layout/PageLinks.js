import React from "react";

import "../../scss/page-links.scss";

export default class PageLinks extends React.Component {
  state = { visible: false };

  toggleLinkVisibility = () => {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  };

  hideLinks = () => {
    if (this.state.visible) {
      this.setState({
        visible: false
      });
    }
  };

  render() {
    const { visible } = this.state;
    return (
      <div className="page-links">
        <button
          type="button"
          className="toggler"
          onClick={this.toggleLinkVisibility}
        >
          {visible ? "Hide" : "Menu"}
        </button>
        <div
          className={visible ? "visible children" : "children"}
          onClick={e => {
            if (e.target.tagName === "A") {
              this.hideLinks();
            }
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
