import React from "react";
import { Link } from "@curi/react-dom";

import EXAMPLE_API from "../../constants/examples";
import Page from "../layout/Page";
import { PlainSection } from "../layout/Sections";

const Category = ({ examples }) => {
  return (
    <ul className="link-list">
      {examples.map(e => (
        <li key={`${e.category}/${e.slug}`} className="solo">
          <Link name="Example" params={{ category: e.category, slug: e.slug }}>
            {e.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

function ExampleLinks() {
  const examples = EXAMPLE_API.all();
  const categories = Object.keys(examples);
  return (
    <div>
      {categories.map(title => (
        <div key={title}>
          <h3>{title}</h3>
          <Category examples={examples[title]} />
        </div>
      ))}
    </div>
  );
}

export default function ExampleList() {
  return (
    <Page>
      <PlainSection>
        <h1>Curi Examples</h1>

        <p>
          Example projects that you can use for reference while building your
          own application. Most examples have CodeSandbox demos embedded with
          them. Each example includes source code available through the Curi
          package{" "}
          <a href="https://github.com/pshrmn/curi/tree/master/examples">
            on GitHub
          </a>
          .
        </p>
      </PlainSection>

      <PlainSection>
        <ExampleLinks />
      </PlainSection>
    </Page>
  );
}
