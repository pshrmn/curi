import React from "react";

import ActiveLink from "../../links/ActiveLink";
import PackageDropdown from "./lists/PackageDropdown";
import GuideDropdown from "./lists/GuideDropdown";
import ExampleDropdown from "./lists/ExampleDropdown";
import TutorialDropdown from "./lists/TutorialDropdown";

const LIST_ITEM_CLASSNAMES = "p-0 pr-2 pl-0";
const BASE_LINK_CLASSNAMES =
  "text-gray-100 text-xl no-underline h-10 flex items-center px-2 border-0 border-b-2 border-purple";
const HOVER_CLASSNAMES = "hover:text-bright-orange";
const LINK_CLASSNAMES = [BASE_LINK_CLASSNAMES, HOVER_CLASSNAMES].join(" ");
const VISIBLE_DROPDOWN_CLASSNAMES = `text-border-blue border-border-blue hover:text-border-blue`;
const ACTIVE_LINK_CLASSNAMES = "text-bright-orange border-bright-orange";

export let unmodifiedLeftClick = event => {
  return (
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
};

let MenuItem = ({ name, params, text, show, hide, Submenu, group }) => {
  let visible = group === name;
  return (
    <li
      className={LIST_ITEM_CLASSNAMES}
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
      <ActiveLink
        name={name}
        params={params}
        onNav={e => {
          if (unmodifiedLeftClick(e)) {
            // don't navigate!
            e.preventDefault();
            show(name);
          }
        }}
        onFocus={() => {
          show(name);
        }}
        className={`${LINK_CLASSNAMES} ${
          visible ? VISIBLE_DROPDOWN_CLASSNAMES : ""
        }`}
        activeClassName={ACTIVE_LINK_CLASSNAMES}
      >
        {text}
      </ActiveLink>

      <Submenu hidden={!visible} />
    </li>
  );
};

let Header = () => {
  let [group, setGroup] = React.useState();

  let showDropdown = group => {
    setGroup(group);
  };

  let hideDropdown = () => {
    setGroup(undefined);
  };

  return (
    <header
      className="hidden md:block w-screen max-w-full bg-purple p-0 fixed z-10"
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
      <nav className="text-gray-100">
        <ul
          role="menubar"
          className="flex flex-row flex-wrap items-end p-0 m-0 max-w-full"
        >
          <li className={LIST_ITEM_CLASSNAMES}>
            <ActiveLink
              name="Home"
              className={`${LINK_CLASSNAMES} md:text-2xl md:text-bright-orange`}
              activeClassName={ACTIVE_LINK_CLASSNAMES}
            >
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
          <li className={LIST_ITEM_CLASSNAMES}>
            <a
              className={LINK_CLASSNAMES}
              href="https://github.com/pshrmn/curi"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
