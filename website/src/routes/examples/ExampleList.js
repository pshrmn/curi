import React from "react";
import { Link } from "@curi/react-dom";

import EXAMPLE_API from "../../constants/examples";
import Page from "../../components/layout/Page";
import {
  PlainSection,
  TitledPlainSection
} from "../../components/layout/Sections";

function ExampleLinks() {
  const examples = EXAMPLE_API.all();
  return (
    <menu>
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
    </menu>
  );
}

export default function ExampleList() {
  return (
    <Page>
      <TitledPlainSection title="Curi Examples">
        <p>
          Example projects that you can use for reference while building your
          own application. Most examples have CodeSandbox demos embedded with
          them. The source code for the examples is also available{" "}
          <a href="https://github.com/pshrmn/curi/tree/master/examples">
            on GitHub
          </a>
          .
        </p>
      </TitledPlainSection>

      <PlainSection>
        <ExampleLinks />
      </PlainSection>
    </Page>
  );
}
