import React from "react";
import ActiveLink from "../links/ActiveLink";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <ActiveLink name="Home" forward={{ className: "home-link" }}>
            Curi
          </ActiveLink>
        </li>
        <li>
          <ActiveLink name="Packages">Packages</ActiveLink>
        </li>
        <li>
          <ActiveLink name="Guides">Guides</ActiveLink>
        </li>
        <li>
          <ActiveLink name="Tutorials">Tutorials</ActiveLink>
        </li>
        <li>
          <ActiveLink name="Examples">Examples</ActiveLink>
        </li>
        <li>
          <a href="https://github.com/pshrmn/curi">GitHub</a>
        </li>
      </ul>
    </nav>
  );
}
