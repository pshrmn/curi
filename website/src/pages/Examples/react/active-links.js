import React from "react";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/highlight/Inline";
import { Section } from "../../../components/layout/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";

const meta = {
  title: "Active Links"
};

export default function ActiveLinksExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <p>
          You may want to style a link differently when it is "active" (based on
          the current response object). You can do so using the{" "}
          <Cmp>Active</Cmp> and <Cmp>Link</Cmp> components.
        </p>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/active-links" />
      </Section>

      <Section title="On GitHub" id="source">
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/react/active-links">
          here
        </a>.
      </Section>
    </React.Fragment>
  );
}
