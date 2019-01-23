import React from "react";
import styled from "@emotion/styled";

import ActiveLink from "../links/ActiveLink";
import PackageDropdown from "../links/lists/PackageDropdown";
import GuideDropdown from "../links/lists/GuideDropdown";
import ExampleDropdown from "../links/lists/ExampleDropdown";
import TutorialDropdown from "../links/lists/TutorialDropdown";
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

    &.activated {
      color: ${color.borderBlue};
      border-bottom-color: ${color.borderBlue};
    }
  }
`;

const StyledDropdown = styled("div")`
  @media only screen and (min-width: ${screen.medium}) {
    background ${color.lightBlue};
    border-bottom: 2px solid ${color.purple};

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

function DropdownLink({ name, text, activated, toggle }) {
  return (
    <ActiveLink
      name={name}
      onClick={e => {
        // don't navigate!
        e.preventDefault();
        toggle(name);
      }}
      forward={{
        "data-hide": false,
        className: activated ? "activated" : ""
      }}
    >
      {text}
    </ActiveLink>
  );
}

export default class Header extends React.Component {
  state = { group: undefined, Dropdown: undefined };

  toggleDropdown = group => {
    this.setState(prevState => {
      if (prevState.group === group) {
        return {
          group: undefined,
          Dropdown: undefined
        };
      }

      let Dropdown;
      switch (group) {
        case "Packages":
          Dropdown = PackageDropdown;
          break;
        case "Guides":
          Dropdown = GuideDropdown;
          break;
        case "Examples":
          Dropdown = ExampleDropdown;
          break;
        case "Tutorials":
          Dropdown = TutorialDropdown;
          break;
      }

      return { group, Dropdown };
    });
  };

  hideDropdown = () => {
    this.setState({ group: undefined, Dropdown: undefined });
  };

  render() {
    const { group, Dropdown } = this.state;
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
              <DropdownLink
                name="Packages"
                text="API"
                activated={group === "Packages"}
                toggle={this.toggleDropdown}
              />
            </li>
            <li>
              <DropdownLink
                name="Guides"
                text="Guides"
                activated={group === "Guides"}
                toggle={this.toggleDropdown}
              />
            </li>
            <li>
              <DropdownLink
                name="Tutorials"
                text="Tutorials"
                activated={group === "Tutorials"}
                toggle={this.toggleDropdown}
              />
            </li>
            <li>
              <DropdownLink
                name="Examples"
                text="Examples"
                activated={group === "Examples"}
                toggle={this.toggleDropdown}
              />
            </li>
            <li>
              <a href="https://github.com/pshrmn/curi">GitHub</a>
            </li>
          </ul>
        </StyledNav>
        <StyledDropdown
          style={{
            borderBottomWidth: group !== undefined ? "2px" : "0px"
          }}
        >
          {group ? (
            <div>
              <Dropdown />
            </div>
          ) : null}
        </StyledDropdown>
      </StyledHeader>
    );
  }
}
