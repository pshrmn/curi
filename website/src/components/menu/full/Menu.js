import React from "react";
import styled from "@emotion/styled";

import ActiveLink from "../../links/ActiveLink";
import PackageDropdown from "../../links/lists/PackageDropdown";
import GuideDropdown from "../../links/lists/GuideDropdown";
import ExampleDropdown from "../../links/lists/ExampleDropdown";
import TutorialDropdown from "../../links/lists/TutorialDropdown";
import { color, screen } from "../../../constants/styles";

const StyledHeader = styled("header")`
  display: none;

  @media only screen and (min-width: ${screen.medium}) {
    display: block;
    width: 100vw;
    max-width: 100%;
    background: ${color.purple};
    padding: 0;
    position: fixed;
    z-index: 1;

    #home-link {
      font-size: 1.5em;
      color: ${color.brightOrange};
    }
  }
`;

const FlexList = styled("ul")`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 100%;
`;

const StyledNav = styled("nav")`
  color: ${color.lightGray};

  li {
    margin-right: 20px;
    padding: 0;

    &.base > a {
      color: ${color.lightGray};
      font-size: 1.1em;
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
    }
  }

  a {
    text-decoration: none;      
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
        className: activated ? "activated group" : "group"
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
          group: undefined
        };
      }
      return { group };
    });
  };

  hideDropdown = () => {
    this.setState({ group: undefined, Dropdown: undefined });
  };

  render() {
    const { group } = this.state;
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
          <FlexList>
            <li className="base">
              <ActiveLink name="Home" forward={{ id: "home-link" }}>
                Curi
              </ActiveLink>
            </li>
            <li className="base">
              <DropdownLink
                name="Packages"
                text="API"
                activated={group === "Packages"}
                toggle={this.toggleDropdown}
              />
              <PackageDropdown active={group === "Packages"} />
            </li>
            <li className="base">
              <DropdownLink
                name="Guides"
                text="Guides"
                activated={group === "Guides"}
                toggle={this.toggleDropdown}
              />
              <GuideDropdown active={group === "Guides"} />
            </li>
            <li className="base">
              <DropdownLink
                name="Tutorials"
                text="Tutorials"
                activated={group === "Tutorials"}
                toggle={this.toggleDropdown}
              />
              <TutorialDropdown active={group === "Tutorials"} />
            </li>
            <li className="base">
              <DropdownLink
                name="Examples"
                text="Examples"
                activated={group === "Examples"}
                toggle={this.toggleDropdown}
              />
              <ExampleDropdown active={group === "Examples"} />
            </li>
            <li className="base">
              <a href="https://github.com/pshrmn/curi">GitHub</a>
            </li>
          </FlexList>
        </StyledNav>
      </StyledHeader>
    );
  }
}
