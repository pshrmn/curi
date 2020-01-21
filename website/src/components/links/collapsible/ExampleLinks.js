import React from "react";

import EXAMPLE_API from "../../../constants/examples";
import ActiveLink from "../ActiveLink";

let Category = ({ examples }) => {
  return (
    <ul className="link-list">
      {examples.map(e => {
        return (
          <li key={e.slug} className="solo">
            <ActiveLink name="Example" params={{ slug: e.slug }}>
              {e.name}
            </ActiveLink>
          </li>
        );
      })}
    </ul>
  );
};

function ExampleLinks() {
  let examples = EXAMPLE_API.all();
  return <Category examples={examples} />;
}

export default React.memo(ExampleLinks);
