import React from "react";
import ActiveLink from "../links/ActiveLink";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <ActiveLink to="Home" className="home-link">
            Curi
          </ActiveLink>
        </li>
        <li>
          <ActiveLink to="Packages">Packages</ActiveLink>
        </li>
        <li>
          <ActiveLink to="Guides">Guides</ActiveLink>
        </li>
        <li>
          <ActiveLink to="Tutorials">Tutorials</ActiveLink>
        </li>
        <li>
          <ActiveLink to="Examples">Examples</ActiveLink>
        </li>
        <li>
          <a href="https://github.com/pshrmn/curi">GitHub</a>
        </li>
      </ul>
    </nav>
  );
}
