import React from "react";
import styled from "@emotion/styled";

import { color, screen, font } from "../../constants/styles";

const StyledPageLinks = styled("div")`
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
    display: inline-block;
  }

  h3 {
    border-bottom: 1px solid ${color.darkGray};
  }

  .active {
    font-weight: bold;
  }

  .link-group {
    margin-bottom: 15px;
  }

  .link-list {
    li {
      border-bottom: 1px solid ${color.borderGray};

      &:last-child {
        border-bottom: 0;
      }

      &.with {
        margin: 10px 0;
      }
    }

    p {
      margin: 0;
    }
  }

  .children {
    display: none;
    background: ${color.lightGray};
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

  @media only screen and (min-width: ${screen.medium}) {
    position: relative;
    flex: 0 0 225px;
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
`;

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
      <StyledPageLinks>
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
      </StyledPageLinks>
    );
  }
}
