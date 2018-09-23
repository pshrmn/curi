import React from "react";

import EXAMPLE_API from "../../../constants/examples";
import ActiveLink from "../../../components/ActiveLink";
import CollapsibleGroup from "../../../components/CollapsibleGroup";

const Category = ({ examples }) => {
  return (
    <ul className="link-list">
      {examples.map(e => (
        <li key={`${e.category}/${e.slug}`} className="solo">
          <ActiveLink
            to="Example"
            params={{ category: e.category, slug: e.slug }}
          >
            {e.name}
          </ActiveLink>
        </li>
      ))}
    </ul>
  );
};

export default function ExampleLinks() {
  const examples = EXAMPLE_API.all();
  const categories = Object.keys(examples);
  return categories.map(title => (
    <CollapsibleGroup key={title} title={title}>
      <Category examples={examples[title]} />
    </CollapsibleGroup>
  ));
}
