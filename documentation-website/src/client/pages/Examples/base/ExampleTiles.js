import React from "react";
import { Link } from "@curi/react";

import EXAMPLES from "../../../constants/examples";
import { Section } from "../../../components/Sections";
import PrefetchActiveLink from "../../../components/PrefetchActiveLink";

const Category = ({ name, examples }) => {
  return (
    <ul className="tiles">
      {examples.map(example => (
        <li key={`${example.category}/${example.slug}`} className="tile">
          <PrefetchActiveLink
            to="Example"
            params={{ category: example.category, slug: example.slug }}
          >
            <h2>{example.name}</h2>
            <p className="description">{example.description}</p>
          </PrefetchActiveLink>
        </li>
      ))}
    </ul>
  );
};

export default () => {
  const examples = EXAMPLES.all();
  const categories = Object.keys(examples);
  return (
    <div>
      <ul>
        {categories.map(key => (
          <li key={key}>
            <Link hash={key}>{key}</Link>
          </li>
        ))}
      </ul>
      {categories.map(key => (
        <Section title={key} id={key} key={key}>
          <Category name={key} examples={examples[key]} />
        </Section>
      ))}
    </div>
  );
};
