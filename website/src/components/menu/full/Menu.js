import React from "react";
import styled from "@emotion/styled";

import ActiveLink from "../../links/ActiveLink";
import PackageDropdown from "./lists/PackageDropdown";
import GuideDropdown from "./lists/GuideDropdown";
import ExampleDropdown from "./lists/ExampleDropdown";
import TutorialDropdown from "./lists/TutorialDropdown";
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

function DropdownLink({ name, text, activated, toggle, ...rest }) {
  return (
    <ActiveLink
      name={name}
      onNav={e => {
        // don't navigate!
        e.preventDefault();
        toggle(name);
      }}
      data-hide={false}
      className={activated ? "activated group" : "group"}
      {...rest}
    >
      {text}
    </ActiveLink>
  );
}

export default function Header(props) {
  const [group, setGroup] = React.useState();

  const toggleDropdown = group => {
    setGroup(prevGroup => {
      if (prevGroup === group) {
        return undefined;
      }
      return group;
    });
  };

  const hideDropdown = () => {
    setGroup(undefined);
  };

  return (
    <StyledHeader
      onClick={e => {
        if (e.target.tagName === "A") {
          // we don't want to hide a click on the dropdown toggle links,
          // so they have data-hide="false" attributes
          if (e.target.dataset.hide && e.target.dataset.hide === "false") {
            return;
          }
          hideDropdown();
        }
      }}
      onKeyDown={
        group === undefined
          ? null
          : e => {
              if (e.which === 27) {
                hideDropdown();
              }
            }
      }
    >
      <StyledNav>
        <FlexList>
          <li className="base">
            <ActiveLink name="Home" id="home-link">
              Curi
            </ActiveLink>
          </li>
          <li className="base">
            <DropdownLink
              name="Packages"
              params={{ version: "v2" }}
              text="API"
              activated={group === "Packages"}
              toggle={toggleDropdown}
            />
            <PackageDropdown
              active={group === "Packages"}
              close={hideDropdown}
            />
          </li>
          <li className="base">
            <DropdownLink
              name="Guides"
              text="Guides"
              activated={group === "Guides"}
              toggle={toggleDropdown}
            />
            <GuideDropdown active={group === "Guides"} close={hideDropdown} />
          </li>
          <li className="base">
            <DropdownLink
              name="Tutorials"
              text="Tutorials"
              activated={group === "Tutorials"}
              toggle={toggleDropdown}
            />
            <TutorialDropdown
              active={group === "Tutorials"}
              close={hideDropdown}
            />
          </li>
          <li className="base">
            <DropdownLink
              name="Examples"
              text="Examples"
              activated={group === "Examples"}
              toggle={toggleDropdown}
            />
            <ExampleDropdown
              active={group === "Examples"}
              close={hideDropdown}
            />
          </li>
          <li className="base">
            <a href="https://github.com/pshrmn/curi">GitHub</a>
          </li>
        </FlexList>
      </StyledNav>
    </StyledHeader>
  );
}
