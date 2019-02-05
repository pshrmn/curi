import React from "react";

import EXAMPLE_API from "../../../../constants/examples";
import ActiveLink from "../../../links/ActiveLink";
import Container from "./Container";
import usePrefetch from "./usePrefetch";

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

const examples = EXAMPLE_API.all();
const categories = Object.keys(examples);
const flatExamples = Object.keys(examples).reduce((acc, category) => {
  examples[category].forEach(item => {
    acc.push({
      name: "Example",
      params: { category, slug: item.slug }
    });
  });
  return acc;
}, []);

function ExampleLinks({ active, close }) {
  usePrefetch(flatExamples, active);
  return (
    <Container active={active} close={close}>
      {categories.map(title => (
        <div key={title}>
          <h3>{title}</h3>
          <Category examples={examples[title]} />
        </div>
      ))}
    </Container>
  );
}

export default React.memo(ExampleLinks);
