import React from "react";

import ActiveLink from "../../links/ActiveLink";
import PackageDropdown from "./lists/PackageDropdown";
import GuideDropdown from "./lists/GuideDropdown";
import ExampleDropdown from "./lists/ExampleDropdown";
import TutorialDropdown from "./lists/TutorialDropdown";

let StyledHeader = ({ children, ...rest }) => {
  return (
    <header
      {...rest}
      className="hidden md:block w-screen max-w-full bg-purple p-0 fixed z-10"
    >
      {children}
    </header>
  );
};

let FlexList = ({ children, ...rest }) => {
  return (
    <ul
      {...rest}
      className="flex flex-row flex-wrap items-end p-0 m-0 max-w-full"
    >
      {children}
    </ul>
  );
};

let StyledNav = ({ children, ...rest }) => {
  return (
    <nav {...rest} className="text-gray-100">
      {children}
    </nav>
  );
};

let ListItem = ({ children, ...rest }) => {
  return (
    <li {...rest} className="py-0 pr-4 pl-0">
      {children}
    </li>
  );
};

const BASE_LINK_CLASSNAMES =
  "text-gray-100 text-xl no-underline h-12 flex items-center px-2 border-0 border-b-2 border-purple";
const HOVER_CLASSNAMES = "hover:text-bright-orange";
const LINK_CLASSNAMES = [BASE_LINK_CLASSNAMES, HOVER_CLASSNAMES].join(" ");
const ACTIVATED_DROPDOWN_CLASSNAMES = `text-border-blue border-border-blue hover:text-border-blue`;
const ACTIVE_LINK_CLASSNAMES = "text-bright-orange border-bright-orange";

export function unmodifiedLeftClick(event) {
  return (
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
}

function MenuItem({ name, params, text, show, hide, Submenu, group }) {
  let active = group === name;
  return (
    <ListItem
      aria-haspopup="true"
      onBlur={e => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          hide(name);
        }
      }}
      onMouseEnter={() => {
        show(name);
      }}
      onMouseLeave={() => {
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
    </ListItem>
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
      className={`${LINK_CLASSNAMES} ${
        activated ? ACTIVATED_DROPDOWN_CLASSNAMES : ""
      }`}
      activeClassName={ACTIVE_LINK_CLASSNAMES}
      {...rest}
    >
      {text}
    </ActiveLink>
  );
}

export default function Header() {
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
          <ListItem>
            <ActiveLink
              name="Home"
              className={`${LINK_CLASSNAMES} md:text-2xl md:text-bright-orange`}
              activeClassName={ACTIVE_LINK_CLASSNAMES}
            >
              Curi
            </ActiveLink>
          </ListItem>
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
          <ListItem>
            <a
              className={LINK_CLASSNAMES}
              href="https://github.com/pshrmn/curi"
            >
              GitHub
            </a>
          </ListItem>
        </FlexList>
      </StyledNav>
    </StyledHeader>
  );
}
