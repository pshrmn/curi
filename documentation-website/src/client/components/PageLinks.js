import React from "react";

// import "../scss/page-links.scss";

class PageLinks extends React.Component {
  state = { visible: false };

  toggleLinks = () => {
    this.setState(prevState => ({
      visible: !prevState.visible
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
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PageLinks;
