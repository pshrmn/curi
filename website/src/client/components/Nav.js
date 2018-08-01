import React from "react";
import PrefetchActiveLink from "./PrefetchActiveLink";

export default () => (
  <nav>
    <ul>
      <li>
        <PrefetchActiveLink to="Home" className="home-link">
          Curi
        </PrefetchActiveLink>
      </li>
      <li>
        <PrefetchActiveLink to="Packages">Packages</PrefetchActiveLink>
      </li>
      <li>
        <PrefetchActiveLink to="Guide" params={{ slug: "creating-a-router" }}>
          Guides
        </PrefetchActiveLink>
      </li>
      <li>
        <PrefetchActiveLink to="Tutorials">Tutorials</PrefetchActiveLink>
      </li>
      <li>
        <PrefetchActiveLink to="Examples">Examples</PrefetchActiveLink>
      </li>
      <li>
        <a href="https://github.com/pshrmn/curi">GitHub</a>
      </li>
    </ul>
  </nav>
);
