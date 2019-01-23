import React from "react";
import styled from "@emotion/styled";

import ActiveLink from "../links/ActiveLink";
import PackageDropdown from "../links/dropdowns/PackageDropdown";
import GuideDropdown from "../links/dropdowns/GuideDropdown";
import ExampleDropdown from "../links/dropdowns/ExampleDropdown";
import TutorialDropdown from "../links/dropdowns/TutorialDropdown";
import { color, screen } from "../../constants/styles";

const StyledHeader = styled("header")`
  display: none;

  @media only screen and (min-width: ${screen.medium}) {
    display: block;
    width: 100vw;
    background: ${color.purple};
    padding: 0;
    position: fixed;
    z-index: 1;

    .home-link {
      font-size: 1.5em;
      color: ${color.brightOrange};
    }
  }
`;

const StyledNav = styled("nav")`
  width: ${screen.medium};
  margin: 0 auto;

  color: ${color.lightGray};

  ul {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-end;
    list-style: none;
    padding: 0;
    margin: 0;
    max-width: 100%;
  }

  li {
    margin-right: 20px;
    padding: 0;
  }

  a {
    color: ${color.lightGray};
    font-size: 1.1em;
    text-decoration: none;
    display: flex;
    height: 50px;
    align-items: center;
    border-bottom: 3px solid ${color.purple};
    padding: 0 5px;

    &:hover {
      color: ${color.brightOrange};
    }

    &.active {
      color: ${color.brightOrange};
      border-bottom-color: ${color.brightOrange};
    }
  }
`;

const StyledDropdown = styled("div")`
  @media only screen and (min-width: ${screen.medium}) {
    background ${color.lightGray};
    border-bottom: 2px solid ${color.brightOrange};

    > div {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      width: ${screen.medium};
      margin: 0 auto;
    }

    a {
      color: ${color.purple};
      text-decoration: none;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
`;

export default class Header extends React.Component {
  state = { dropdown: undefined };

  toggleDropdown = name => {
    this.setState(prevState => {
      let dropdown;
      switch (name) {
        case "Packages":
          dropdown = PackageDropdown;
          break;
        case "Guides":
          dropdown = GuideDropdown;
          break;
        case "Examples":
          dropdown = ExampleDropdown;
          break;
        case "Tutorials":
          dropdown = TutorialDropdown;
          break;
      }
      if (prevState.dropdown === dropdown) {
        dropdown = undefined;
      }
      return { dropdown };
    });
  };

  hideDropdown = () => {
    this.setState({ dropdown: undefined });
  };

  render() {
    const { dropdown: Dropdown } = this.state;

    return (
      <StyledHeader
        onClick={e => {
          if (e.target.tagName === "A") {
            // we don't want to hide a click on the dropdown toggle links,
            // so they have data-hide="false" attributes
            if (e.target.dataset.hide && e.target.dataset.hide === "false") {
              return;
            }
            this.hideDropdown();
          }
        }}
      >
        <StyledNav>
          <ul>
            <li>
              <ActiveLink name="Home" forward={{ className: "home-link" }}>
                Curi
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                name="Packages"
                onClick={e => {
                  // don't navigate!
                  e.preventDefault();
                  this.toggleDropdown("Packages");
                }}
                forward={{
                  "data-hide": false
                }}
              >
                API
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                name="Guides"
                onClick={e => {
                  // don't navigate!
                  e.preventDefault();
                  this.toggleDropdown("Guides");
                }}
                forward={{
                  "data-hide": false
                }}
              >
                Guides
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                name="Tutorials"
                onClick={e => {
                  // don't navigate!
                  e.preventDefault();
                  this.toggleDropdown("Tutorials");
                }}
                forward={{
                  "data-hide": false
                }}
              >
                Tutorials
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                name="Examples"
                onClick={e => {
                  // don't navigate!
                  e.preventDefault();
                  this.toggleDropdown("Examples");
                }}
                forward={{
                  "data-hide": false
                }}
              >
                Examples
              </ActiveLink>
            </li>
            <li>
              <a href="https://github.com/pshrmn/curi">GitHub</a>
            </li>
          </ul>
        </StyledNav>
        <StyledDropdown>
          <div>{Dropdown && <Dropdown />}</div>
        </StyledDropdown>
      </StyledHeader>
    );
  }
}
