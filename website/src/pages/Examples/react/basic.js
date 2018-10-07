import React from "react";

import CodeSandboxDemo from "../../../components/CodeSandboxDemo";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/highlight/Inline";
import { Note } from "../../../components/Messages";
import { Section } from "../../../components/layout/Sections";

export default function BasicExample() {
  return (
    <React.Fragment>
      <Section title="Explanation" id="explanation">
        <p>
          This example demonstrates the basics of a Curi + React application.
        </p>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/basic" />
      </Section>

      <Section title="On GitHub" id="source">
        <p>
          If you want to run this code locally, the source code is available on
          GitHub{" "}
          <a href="https://github.com/pshrmn/curi/tree/master/examples/react/basic">
            here
          </a>.
        </p>
      </Section>
    </React.Fragment>
  );
}
