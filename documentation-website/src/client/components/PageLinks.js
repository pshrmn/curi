import React from "react";
import { css } from "emotion";

import STYLES from "../constants/styles";

const pageLinks = css(`
ul {
  margin: 3px 0;
  padding-left: 0px;
  list-style: none;
}

li {
  margin: 3px 0;
}

a {
  text-decoration: none;
}

h3 {
  border-bottom: 1px solid ${STYLES.darkGray};
}

.active {
  font-weight: bold;
}

.link-group {
  margin-bottom: 15px;
}

.link-list {
  li.with {
    margin: 10px 0;
  }

  p {
    margin: 0;
  }
}

button.toggler {
  position: fixed;
  right: 5px;
  bottom: 5px;
  width: 75px;
  height: 75px;
  border-radius: 40px;
  border: 0;
  background: ${STYLES.brightOrange};
  font-size: 1em;
  z-index: 1;
}

.children {
  display: none;
  background: ${STYLES.lightGray};
  padding: 10px;

  &.visible {
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: scroll;
  }
}

@media only screen and (min-width: ${STYLES.mediumScreen}) {
  position: relative;
  width: 200px;
  min-width: 200px;
  margin-right: 15px;
  order: 1;

  h3 {
    font-size: 1.1em;
  }

  button.toggler {
    display: none;
  }

  .children {
    display: block;
    background: transparent;
  }
}
`);

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
      <div className={pageLinks}>
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
