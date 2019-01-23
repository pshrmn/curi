import React from "react";
import styled from "@emotion/styled";

import ActiveLink from "../links/ActiveLink";
import CollapsibleGroup from "../links/collapsible/CollapsibleGroup";
import PackageLinks from "../links/collapsible/PackageLinks";
import GuideLinks from "../links/collapsible/GuideLinks";
import ExampleLinks from "../links/collapsible/ExampleLinks";
import TutorialLinks from "../links/collapsible/TutorialLinks";

import { color, screen, font } from "../../constants/styles";

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

const StyledButton = styled("button")`
  position: fixed;
  right: 15px;
  bottom: 15px;
  width: 75px;
  height: 75px;
  border-radius: 40px;
  border: 0;
  background: ${color.blue};
  font-size: 1em;
  font-family: ${font.serif};
  z-index: 9999;

  @media only screen and (min-width: ${screen.medium}) {
    display: none;
  }
`;

export default class MobileMenu extends React.Component {
  state = { menuVisible: false };
  key = 0;

  toggleLinkVisibility = () => {
    this.setState(prevState => ({
      menuVisible: !prevState.menuVisible
    }));
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

  render() {
    const { menuVisible } = this.state;
    return (
      <React.Fragment>
        <StyledButton
          type="button"
          className="toggler"
          onClick={this.toggleLinkVisibility}
        >
          {menuVisible ? "Hide" : "Menu"}
        </StyledButton>
        <StyledMenu
          hidden={!menuVisible}
          className={menuVisible ? "visible" : ""}
          onClick={e => {
            if (e.target.tagName === "A") {
              this.hideMenu();
            }
          }}
        >
          <nav key={this.key}>
            <ul>
              <li>
                <ActiveLink name="Home" forward={{ className: "home-link" }}>
                  Curi
                </ActiveLink>
              </li>
              <li>
                <CollapsibleGroup title="API" initial={true}>
                  <PackageLinks />
                </CollapsibleGroup>
              </li>
              <li>
                <CollapsibleGroup title="Guides" initial={true}>
                  <GuideLinks />
                </CollapsibleGroup>
              </li>
              <li>
                <CollapsibleGroup title="Tutorials" initial={true}>
                  <TutorialLinks />
                </CollapsibleGroup>
              </li>
              <li>
                <CollapsibleGroup title="Examples" initial={true}>
                  <ExampleLinks />
                </CollapsibleGroup>
              </li>
              <li>
                <a href="https://github.com/pshrmn/curi">GitHub</a>
              </li>
            </ul>
          </nav>
        </StyledMenu>
      </React.Fragment>
    );
  }
}
