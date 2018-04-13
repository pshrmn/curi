import React from "react";
import { Link } from "@curi/react";

import EXAMPLE_API from "../../constants/examples";
import styleActive from "../../utils/styleActive";

const Category = ({ name, examples }) => (
  <ul className="link-list">
    {examples.map(e => (
      <li key={`${e.category}/${e.slug}`} className="solo">
        <Link
          to="Example"
          params={{ category: e.category, slug: e.slug }}
          active={{ merge: styleActive }}
        >
          {e.name}
        </Link>
      </li>
    ))}
  </ul>
);

export default () => {
  const examples = EXAMPLE_API.all();
  const categories = Object.keys(examples);
  return (
    <div>
      {categories.map(key => (
        <div key={key}>
          <h3>{key}</h3>
          <Category name={key} examples={examples[key]} />
        </div>
      ))}
    </div>
  );
};
