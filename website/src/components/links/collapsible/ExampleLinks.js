import React from "react";

import EXAMPLE_API from "../../../constants/examples";
import ActiveLink from "../ActiveLink";

let ExampleLinks = () => {
  let examples = EXAMPLE_API.all();
  return (
    <ul>
      {examples.map(e => {
        return (
          <li key={e.slug}>
            <ActiveLink
              name="Example"
              params={{ slug: e.slug }}
              activeClassName="font-bold"
            >
              {e.name}
            </ActiveLink>
          </li>
        );
      })}
    </ul>
  );
};

export default React.memo(ExampleLinks);
