import React from "react";
import styled from "@emotion/styled";

import ActiveLink from "../../links/ActiveLink";
import PackageDropdown from "./lists/PackageDropdown";
import GuideDropdown from "./lists/GuideDropdown";
import ExampleDropdown from "./lists/ExampleDropdown";
import TutorialDropdown from "./lists/TutorialDropdown";
import { color, screen } from "../../../constants/styles";

let StyledHeader = styled("header")`
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

let FlexList = styled("ul")`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 100%;
`;

let StyledNav = styled("nav")`
  color: ${color.lightGray};

  li {
    padding: 0 20px 0 0;

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

export function unmodifiedLeftClick(event) {
  return (
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
}

function MenuItem({ name, params, text, show, hide, Submenu, group }) {
  let active = group === name;
  return (
    <li
      className="base"
      aria-haspopup="true"
      onBlur={e => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          hide(name);
        }
      }}
      onMouseEnter={e => {
        show(name);
      }}
      onMouseLeave={e => {
        hide(name);
      }}
    >
      <DropdownLink
        name={name}
        params={params}
        text={text}
        activated={active}
        show={show}
        hide={hide}
      />
      <Submenu hidden={!active} />
    </li>
  );
}

function DropdownLink({ name, text, activated, show, hide, ...rest }) {
  return (
    <ActiveLink
      name={name}
      onNav={e => {
        if (unmodifiedLeftClick(e)) {
          // don't navigate!
          e.preventDefault();
          show(name);
        }
      }}
      onFocus={e => {
        show(name);
      }}
      className={activated ? "activated group" : "group"}
      {...rest}
    >
      {text}
    </ActiveLink>
  );
}

export default function Header(props) {
  let [group, setGroup] = React.useState();

  let showDropdown = group => {
    setGroup(group);
  };

  let hideDropdown = () => {
    setGroup(undefined);
  };

  return (
    <StyledHeader
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
        <FlexList role="menubar">
          <li className="base">
            <ActiveLink name="Home" id="home-link">
              Curi
            </ActiveLink>
          </li>
          <MenuItem
            name="Packages"
            params={{ version: "v2" }}
            text="API"
            group={group}
            show={showDropdown}
            hide={hideDropdown}
            Submenu={PackageDropdown}
          />
          <MenuItem
            name="Guides"
            text="Guides"
            group={group}
            show={showDropdown}
            hide={hideDropdown}
            Submenu={GuideDropdown}
          />
          <MenuItem
            name="Tutorials"
            text="Tutorials"
            group={group}
            show={showDropdown}
            hide={hideDropdown}
            Submenu={TutorialDropdown}
          />
          <MenuItem
            name="Examples"
            text="Examples"
            group={group}
            show={showDropdown}
            hide={hideDropdown}
            Submenu={ExampleDropdown}
          />
          <li className="base">
            <a href="https://github.com/pshrmn/curi">GitHub</a>
          </li>
        </FlexList>
      </StyledNav>
    </StyledHeader>
  );
}
