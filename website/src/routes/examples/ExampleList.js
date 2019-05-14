import React from "react";
import { Link } from "@curi/react-dom";

import EXAMPLE_API from "../../constants/examples";
import Page from "../../components/layout/Page";
import { PlainSection } from "../../components/layout/Sections";

function ExampleLinks() {
  const examples = EXAMPLE_API.all();
  return (
    <div>
      <ul className="link-list">
        {examples.map(e => {
          return (
            <li key={`${e.slug}`} className="solo">
              <Link name="Example" params={{ slug: e.slug }}>
                {e.name}
              </Link>
            </li>
          );
        })}
      </ul>
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
          them. The source code for the examples is also available{" "}
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
