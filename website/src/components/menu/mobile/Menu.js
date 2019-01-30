import React from "react";
import styled from "@emotion/styled";

import MainContents from "./MainContents";
import PageMenu from "../../layout/PageMenu";
import { MenuToggleButton, MainMenuButton, PageMenuButton } from "./buttons";
import { color, screen } from "../../../constants/styles";

const StyledMenu = styled("div")`
  display: none;
  position: fixed;
  overflow-y: scroll;
  width: 100vw;
  height: 100vh;
  background: ${color.lightGray};
  z-index: 999;
  padding: 15px;

  &.visible {
    display: block;
  }

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
    color: ${color.purple};
  }

  h3 {
    border-bottom: 1px solid ${color.darkGray};
  }

  .active {
    font-weight: bold;
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
    display: none;

    &.visible {
      display: none;
    }
  }
`;

const StyledControls = styled("div")`
  position: fixed;
  right: 15px;
  bottom: 15px;
  display: flex;
  flex-flow: column-reverse;
  z-index: 9999;
`;

function MenuControls(props) {
  return (
    <StyledControls>
      <MenuToggleButton {...props} />
      <MainMenuButton {...props} />
      {props.hasPage && <PageMenuButton {...props} />}
    </StyledControls>
  );
}

export default class MobileMenu extends React.Component {
  state = {
    menuVisible: false,
    whichMenu: "main"
  };
  key = 0;

  toggleMenuVisibility = () => {
    this.setState(prevState => ({
      menuVisible: !prevState.menuVisible
    }));
  };

  toggleMenuType = type => {
    this.setState({
      whichMenu: type
    });
  };

  hideMenu = () => {
    if (this.state.menuVisible) {
      // cheap menu reset
      this.key++;
      this.setState({
        menuVisible: false
      });
    }
  };

  componentDidUpdate() {
    // reset to the main menu when navigating to a page without
    // page contents
    if (this.state.whichMenu === "page" && !this.props.contents) {
      this.setState({
        whichMenu: "main"
      });
    }
  }

  render() {
    const { menuVisible, whichMenu } = this.state;
    let menu = null;
    if (whichMenu === "main") {
      menu = <MainContents />;
    } else if (whichMenu === "page") {
      menu = this.props.contents ? (
        <PageMenu contents={this.props.contents} />
      ) : null;
    }

    return (
      <React.Fragment>
        <MenuControls
          toggleMenuVisibility={this.toggleMenuVisibility}
          toggleMenuType={this.toggleMenuType}
          visible={menuVisible}
          activeMenu={whichMenu}
          hasPage={this.props.contents !== undefined}
        />
        <StyledMenu
          hidden={!menuVisible}
          className={menuVisible ? "visible" : ""}
          onClick={e => {
            if (e.target.tagName === "A") {
              this.hideMenu();
            }
          }}
        >
          <nav key={this.key}>{menu}</nav>
        </StyledMenu>
      </React.Fragment>
    );
  }
}
