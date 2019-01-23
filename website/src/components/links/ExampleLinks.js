import React from "react";

import EXAMPLE_API from "../../constants/examples";
import ActiveLink from "./ActiveLink";
import CollapsibleGroup from "./CollapsibleGroup";

const Category = ({ examples }) => {
  return (
    <ul className="link-list">
      {examples.map(e => (
        <li key={`${e.category}/${e.slug}`} className="solo">
          <ActiveLink
            name="Example"
            params={{ category: e.category, slug: e.slug }}
          >
            {e.name}
          </ActiveLink>
        </li>
      ))}
    </ul>
  );
};

function ExampleLinks() {
  const examples = EXAMPLE_API.all();
  const categories = Object.keys(examples);
  return categories.map(title => (
    <CollapsibleGroup key={title} title={title} initial={true}>
      <Category examples={examples[title]} />
    </CollapsibleGroup>
  ));
}

export default React.memo(ExampleLinks);
