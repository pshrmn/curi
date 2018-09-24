import React from "react";

import EXAMPLE_API from "../../constants/examples";
import ActiveLink from "./ActiveLink";
import CollapsibleGroup from "./CollapsibleGroup";

const Category = ({ examples, hide }) => {
  return (
    <ul className="link-list">
      {examples.map(e => (
        <li key={`${e.category}/${e.slug}`} className="solo">
          <ActiveLink
            to="Example"
            params={{ category: e.category, slug: e.slug }}
            onClick={e => {
              if (hide) {
                hide();
              }
            }}
          >
            {e.name}
          </ActiveLink>
        </li>
      ))}
    </ul>
  );
};

export default function ExampleLinks({ hide }) {
  const examples = EXAMPLE_API.all();
  const categories = Object.keys(examples);
  return categories.map(title => (
    <CollapsibleGroup key={title} title={title}>
      <Category examples={examples[title]} hide={hide} />
    </CollapsibleGroup>
  ));
}
